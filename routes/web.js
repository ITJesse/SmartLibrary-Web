var express = require('express');
var router = express.Router();
var fs = require('fs');

var mysql = require('../modules/mysql');
var config = require('../modules/config');

/* GET home page. */
router.get('/GetChartVal', function(req, res) {
    var id = req.query.id;
    var startTime = parseInt(req.query.startTime) ? Math.ceil((new Date()).valueOf() / 1000) - req.query.startTime : Math.ceil(((new Date()).valueOf() - 10 * 60 * 1000) / 1000);
    var sql = "SELECT (UNIX_TIMESTAMP(xbee_data.time) + 8 * 60 * 60) * 1000 AS time, xbee_data.`value` FROM xbee_list INNER JOIN xbee_data ON xbee_list.mac = xbee_data.mac AND xbee_data.type = xbee_list.type WHERE xbee_list.id = " + id + " AND UNIX_TIMESTAMP(xbee_data.time) > " + startTime + " ORDER BY xbee_data.time ASC";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        var data = [];
        if(rows.length > 100){
            var radio = Math.floor(rows.length / 100);
            for(var i = 0; i < 100 * radio; i = i + radio){
                data.push([rows[i].time, parseFloat(rows[i].value)]);
            }
        }else{
            for(var i in rows){
                data.push([rows[i].time, parseFloat(rows[i].value)]);
            }
        }
        var sql = "SELECT name FROM xbee_list WHERE id = '"+id+"'";
        mysql.query(sql, function(err, rows) {
            if(err){
                console.log(err);
                result = {error: "-5"};
                return res.json(result);
            }
            var result = {error: null, label: rows[0].name, data: data};
            res.json(result);
        });
    });
});

router.get('/GetLastVal', function(req, res) {
    var id = req.query.id;
    var sql = "SELECT xbee_data.`value`, xbee_list.`name`, xbee_list.unit, UNIX_TIMESTAMP(xbee_data.`time`) * 1000 AS time FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '" + id + "' ORDER BY xbee_data.time DESC LIMIT 1";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        var result = rows[0];
        result.error = null;
        res.json(result);
    });
});

router.get('/GetStudyRoomUsed', function(req, res) {
    var sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND NOW() - outTime < 1800)";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        var result = {};
        result.error = null;
        result.used = rows[0].used;
        res.json(result);
    });
});

router.get('/GetCameraImage', function(req, res) {
    fs.readdir(config.common.cameraUploadDir, function (err, files) {
        if (err){
            console.log(err);
            return res.render('500');
        }
        var result, tmp;
        files.forEach(function (filename) {
            result = tmp;
            tmp = filename;
        });
        fs.readFile(config.common.cameraUploadDir + result, function (err, data) {
            if (err){
                console.log(err);
                return res.render('500');
            }
            res.set('Content-Type', 'image/jpeg');
            res.send(data);
        });
    });
});

module.exports = router;
