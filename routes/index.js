var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    var sql = "SELECT * FROM xbee_list";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.render('index', {
            title: 'Express',
            isLogin: req.session.isLogin,
            list: rows
        });
    });
});

module.exports = router;