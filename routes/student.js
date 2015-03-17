var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

router.get('/GetStudentInfo', function(req, res) {
    var studentId = req.query.studentId;
    var sql = "SELECT * FROM student WHERE studentId = '"+studentId+"'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        if(rows[0]){
            return res.json(rows[0]);
        }else{
            result = {error: "-1"};
            return res.json(result);
        }
    });
});

router.get('/GetCardInfo', function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT *, student.studentId, student.`name`, student.sex, student.class, student.college FROM student_bind LEFT JOIN student ON student_bind.studentId = student.studentId WHERE student_bind.uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        if(rows[0]){
            return res.json(rows[0]);
        }else{
            result = {error: "-1"};
            return res.json(result);
        }
    });
});

router.get('/CheckCardId', function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT * FROM student_bind WHERE uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        if(rows[0]){
            return res.send('-1');
        }else{
            return res.json('1');
        }
    });
});

router.get('/BindCard', function(req, res) {
    var uid = req.query.uid;
    var studentId = req.query.studentId;
    var sql = "INSERT INTO student_bind (studentId, uid) VALUES ('"+studentId+"', '"+uid+"') ON DUPLICATE KEY UPDATE uid='"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        return res.json('1');
    });
});

router.get('/UnBindCard', function(req, res) {
    var uid = req.query.uid;
    var sql = "DELETE FROM student_bind WHERE uid = '"+uid+"'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        return res.json('1');
    });
});

module.exports = router;
