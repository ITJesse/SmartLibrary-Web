var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
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
    if (req.body.studentId == "1203020333" && req.body.password == "zyb940708") {
        req.session.isLogin = 1;
        res.redirect("/");
    } else {
        res.render('login', {
            title: '登陆',
            studentId: req.body.studentId,
            password: req.body.password,
            error: "登陆失败"
        });
    }
});

module.exports = router;