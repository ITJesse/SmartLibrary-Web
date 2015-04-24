var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

router.get('/GetStudentInfo', function(req, res) {
    var studentId = req.query.studentId;
    var sql = "SELECT * FROM wit_user_info_view WHERE studentId = '"+studentId+"'";
    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        if(rows[0]){
            result = {error: null, info: rows[0]};
            return res.json(result);
        }else{
            result = {error: "-4"};
            return res.json(result);
        }
    });
});

router.get('/GetCardInfo', function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT * FROM wit_user_info_view WHERE uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        if(rows[0]){
            result = {error: null, info: rows[0]};
            return res.json(result);
        }else{
            result = {error: "-9"};
            return res.json(result);
        }
    });
});

router.get('/CheckCardId', function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT * FROM student_bind WHERE uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
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

router.get('/BindCard', function(req, res) {
    var uid = req.query.uid;
    var studentId = req.query.studentId;
    var sql = "INSERT INTO student_bind (studentId, uid) VALUES ('"+studentId+"', '"+uid+"') ON DUPLICATE KEY UPDATE uid='"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        result = {error: null, result: 'ok'};
        return res.json(result);
    });
});

router.get('/UnBindCard', function(req, res) {
    var uid = req.query.uid;
    var sql = "DELETE FROM student_bind WHERE uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
            result = {error: "-5"};
            return res.json(result);
        }
        result = {error: null, result: 'ok'};
        return res.json(result);
    });
});

module.exports = router;
