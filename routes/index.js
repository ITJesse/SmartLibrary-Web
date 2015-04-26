var express = require('express');
var router = express.Router();
var async = require('async');
var colors = require('colors');

var mysql = require('../modules/mysql');

var layout = {};

/* GET home page. */
router.all('/*', function(req, res, next) {
    async.parallel({
        seatUsed: function(callback){
            var sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND NOW() - outTime < 1800)";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].used);
                }
            });
        },
        enterStudentCount: function(callback){
            var sql = "SELECT COUNT(studentId) AS enter FROM student_enter_log WHERE `in` = 1";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].enter);
                }
            });
        },
        selfStudyCount: function(callback){
            var sql = "SELECT COUNT(studentId) AS count FROM study_room_seat";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].count);
                }
            });
        },
        bookLendCount: function(callback){
            var sql = "SELECT COUNT(tagId) AS count FROM lend WHERE TO_DAYS(lendTime) = TO_DAYS(NOW())";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].count);
                }
            });
        },
        studyRoomUsed: function(callback){
            var sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND NOW() - outTime < 1800)";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].used);
                }
            });
        }
    }, function(err, data){
        if(err){
            console.log(err);
            res.render('500');
        }else{
            layout = data;
            layout.studyRoomUsedPercent = Math.ceil(data.studyRoomUsed / 3000);
            next();
        }
    });
});

router.get('/', function(req, res) {
    async.parallel({
        temperature: function(callback){
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '1' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].value);
                }
            });
        },
        brightness: function(callback){
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '2' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].value);
                }
            });
        },
        humidity: function(callback){
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '3' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }else{
                    callback(null, rows[0].value);
                }
            });
        }
    }, function(err, result){
        if(err){
            res.render('500');
        }else{
            res.render('index', {
                title: '智慧图书馆',
                layout: layout,
                temperature: result.temperature,
                humidity: result.humidity,
                brightness: result.brightness
            });
        }
    });
});

router.get('/environment', function(req, res, next) {
    var sql = "SELECT * FROM xbee_list WHERE is_admin = 0";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.render('environment', {
            title: '环境监测',
            layout: layout,
            list: rows
        });
    });
});

module.exports = router;
