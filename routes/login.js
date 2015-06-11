var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

router.get('/', function(req, res, next) {
    console.log(req.session.isLogin);
    if (req.session.isLogin) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    res.render('login', {
        title: '登陆',
        isLogin: req.session.isLogin
    });
});

router.post('/', function(req, res) {
    var studentId = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM wit_user WHERE studentId = '" + studentId + "'";
    mysql.query(sql, function(err, rows){
        if(err) return console.log(err);
        if(!rows[0]){
            return res.render('login', {
                title: '登陆',
                studentId: req.body.studentId,
                password: req.body.password,
                error: "用户不存在"
            });
        }else{
            if(rows[0].pass != password){
                return res.render('login', {
                    title: '登陆',
                    studentId: req.body.studentId,
                    password: req.body.password,
                    error: "密码不正确"
                });
            }else{
                req.session.isLogin = 1;
                req.session.isAdmin = rows[0].is_admin;
                req.session.name = rows[0].name;
                req.session.studentId = studentId;
                res.redirect('/');
            }
        }
    });
});

module.exports = router;
