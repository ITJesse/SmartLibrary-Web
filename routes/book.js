var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');
var moment = require('moment');
var async = require('async');

router.post('/InsertBook', function(req, res) {
    var isbn = req.body.isbn;
    var title = req.body.title;
    var tagId = req.body.tagId;
    var publisher = req.body.publisher;
    var summary = req.body.summary;
    var author = req.body.author;
    var image = req.body.image;

    var sql = "INSERT INTO book (tagId, isbn, title, author, publisher, summary, image) VALUES ('" + tagId + "', '" + isbn + "', '" + title + "', '" + author + "', '" + publisher + "', '" + summary + "', '" + image + "')";
    mysql.query(sql, function(err) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        result = {error: null, result: 'ok'};
        return res.json(result);
    });
});

router.get('/CheckTagId', function(req, res) {
    var tagId = req.query.tagId;
    var sql = "SELECT tagId FROM book WHERE tagId = '" + tagId + "'";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        if(rows[0]){
            result = {error: null, check: '1'};
            return res.json(result);
        }else{
            result = {error: null, check: '-1'};
            return res.json(result);
        }
    });
});

router.get('/GetBookList', function(req, res) {
    var sql = "SELECT title, author, isbn, publisher, time FROM book";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        } else {
            var tableData = {
                data: []
            };
            for (var i in rows) {
                tableData.data[i] = [rows[i].title, rows[i].author, rows[i].isbn, rows[i].publisher, moment(rows[i].time).format('YYYY-MM-DD')];
            }
            result = tableData;
            return res.json(result);
        }
    });
});

router.get('/GetTagInfo', function(req, res) {
    var tagId = req.query.tagId;
    var sql = "SELECT title, author, isbn, publisher FROM book WHERE tagId = '"+tagId+"'";
    mysql.query(sql, function(err, rows) {
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        if(rows[0]){
            result = {error: null, info: rows[0]};
            return res.json(result);
        }else{
            result = {error: "-10"};
            return res.json(result);
        }
    });
});

router.post('/LendBook', function(req, res) {
    var tagList = req.body.tagList.split(',');
    // console.log(tagList);
    var type = req.body.type;
    async.waterfall([
        function(callback) {
            if(type == 'uid'){
                var uid = req.body.uid;
                var sql = "SELECT studentId FROM student_bind WHERE uid = '"+uid+"'";
                mysql.query(sql, function(err, rows){
                    if(err){
                        callback(err);
                    }
                    else if(!rows[0]){
                        callback('none uid');
                    }
                    else{
                        callback(null, rows[0].studentId);
                    }
                });
            }else{
                callback(null, req.body.studentId);
            }
        },
        function(studentId, callback) {
            var sql = "SELECT * FROM wit_user WHERE studentId = '"+studentId+"'";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                else if(!rows[0]){
                    callback('none studentId');
                }
                else{
                    callback(null, studentId);
                }
            });
        },
        function(studentId, callback) {
            var sql = "SELECT * FROM lend WHERE studentId = '"+studentId+"' AND isReturn = 0";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                else if(rows.length + tagList.length > 5){
                    callback('max');
                }
                else{
                    callback(null, studentId);
                }
            });
        },
        function(studentId, callback) {
            var sqlList = [];
            for(var i in tagList){
                sqlList.push("SELECT tagId FROM lend WHERE tagId = '"+tagList[i]+"' AND isReturn = 0");
            }
            callback(null, sqlList, studentId);
        },
        function(sqlList, studentId, callback) {
            async.each(sqlList, function(sql, cb) {
                mysql.query(sql, function(err, rows){
                    if(err){
                        cb(err);
                    }else{
                        if(rows[0]){
                            tagList.splice(tagList.indexOf(rows[0].tagId), 1);
                        }
                        cb(null);
                    }
                });
            }, function(err){
                if(err){
                    callback(err);
                }else{
                    callback(null, studentId);
                }
            });
        },
        function(studentId, callback) {
            var sqlList = [];
            for(var i in tagList){
                sqlList.push("INSERT INTO lend (tagId, studentId) VALUES ('"+tagList[i]+"', '"+studentId+"')");
            }
            callback(null, sqlList);
        },
        function(sqlList, callback) {
            async.each(sqlList, function(sql, cb) {
                mysql.query(sql, function(err){
                    if(err){
                        cb(err);
                    }else{
                        cb(null);
                    }
                });
            }, function(err){
                if(err){
                    callback(err);
                }else{
                    callback(null);
                }
            });
        }
    ], function (err, result) {
        result = {};
        if(err && err == 'max'){
            result.error = '-6';
        }
        else if(err && err == 'none uid'){
            result.error = '-9';
        }
        else if(err && err == 'none studentId'){
            result.error = '-4';
        }
        else if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        else{
            result.error = null;
        }
        result.result = 'ok';
        res.json(result);
    });
});

router.post('/ReturnBook', function(req, res) {
    var tagList = req.body.tagList.split(',');
    var sqlList = [];
    for(var i in tagList){
        sqlList.push("UPDATE lend SET isReturn = 1, returnTime = NOW() WHERE tagId = '"+tagList[i]+"'");
    }

    async.each(sqlList, function(sql, cb) {
        mysql.query(sql, function(err){
            if(err){
                cb(err);
            }else{
                cb(null);
            }
        });
    }, function(err){
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }else{
            result = {error: null, result: 'ok'};
            return res.json(result);
        }
    });
});

router.get('/Lookup', function(req, res) {
    var type = req.query.type;
    async.waterfall([
        function(callback) {
            if(type == 'uid'){
                var uid = req.query.uid;
                var sql = "SELECT studentId FROM student_bind WHERE uid = '"+uid+"'";
                mysql.query(sql, function(err, rows){
                    if(err){
                        callback(err);
                    }
                    else if(!rows[0]){
                        callback('none uid');
                    }
                    else{
                        callback(null, rows[0].studentId);
                    }
                });
            }else{
                callback(null, req.query.studentId);
            }
        },
        function(studentId, callback) {
            var sql = "SELECT * FROM wit_user WHERE studentId = '"+studentId+"'";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                else if(!rows[0]){
                    callback('none studentId');
                }
                else{
                    callback(null, studentId);
                }
            });
        },
        function(studentId, callback) {
            var sql = "SELECT * FROM lend_view WHERE studentId = '"+studentId+"' AND isReturn = 0";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                else{
                    callback(null, rows);
                }
            });
        }
    ],function(err, rows){
        result = {};
        if(err && err == 'none uid'){
            result.error = '-9';
        }
        else if(err && err == 'none studentId'){
            result.error = '-4';
        }
        else if(err){
            console.log(err);
            result.error = "-5";
            return res.json(result);
        }
        else{
            result.error = null;
        }
        result.list = rows;
        res.json(result);
    });
});

module.exports = router;
