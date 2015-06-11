var express = require('express');
var router = express.Router();
var async = require('async');
var common = require('../modules/common');

var mysql = require('../modules/mysql');
var moment = require('moment');

var layout = {};

/* GET home page. */
router.get('/logout', function(req, res) {
    req.session.isLogin = 0;
    req.session.isAdmin = 0;
    req.session.name = "";
    req.session.studentId = "";
    return res.redirect('/');
});

router.all('/*', function(req, res, next) {
    async.parallel({
        seatUsed: function(callback) {
            var sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND NOW() - outTime < 1800)";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, rows[0].used);
                }
            });
        },
        enterStudentCount: function(callback) {
            var sql = "SELECT COUNT(studentId) AS enter FROM student_enter_log WHERE `in` = 1";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, rows[0].enter);
                }
            });
        },
        selfStudyCount: function(callback) {
            var sql = "SELECT COUNT(studentId) AS count FROM study_room_seat";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, rows[0].count);
                }
            });
        },
        bookLendCount: function(callback) {
            var sql = "SELECT COUNT(tagId) AS count FROM lend WHERE TO_DAYS(lendTime) = TO_DAYS(NOW())";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, rows[0].count);
                }
            });
        },
        studyRoomUsed: function(callback) {
            var sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND NOW() - outTime < 1800)";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, rows[0].used);
                }
            });
        }
    }, function(err, data) {
        if (err) {
            console.log(err);
            res.render('500');
        } else {
            layout = data;
            layout.studyRoomUsedPercent = Math.ceil(data.studyRoomUsed / 3000);
            next();
        }
    });
});

router.get('/', function(req, res) {
    async.parallel({
        temperature: function(callback) {
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '1' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    if (rows[0]) {
                        callback(null, rows[0].value);
                    } else {
                        callback(null, 0);
                    }
                }
            });
        },
        brightness: function(callback) {
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '2' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    if (rows[0]) {
                        callback(null, rows[0].value);
                    } else {
                        callback(null, 0);
                    }
                }
            });
        },
        humidity: function(callback) {
            var sql = "SELECT xbee_data.`value` FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '3' ORDER BY xbee_data.time DESC LIMIT 1";
            mysql.query(sql, function(err, rows) {
                if (err) {
                    callback(err);
                } else {
                    if (rows[0]) {
                        callback(null, rows[0].value);
                    } else {
                        callback(null, 0);
                    }
                }
            });
        }
    }, function(err, result) {
        if (err) {
            res.render('500');
        } else {
            res.render('index', {
                title: '智慧图书馆',
                layout: layout,
                temperature: result.temperature,
                humidity: result.humidity,
                brightness: result.brightness,
                isLogin: req.session.isLogin,
                isAdmin: req.session.isAdmin,
                name: req.session.name
            });
        }
    });
});

router.get('/environment', function(req, res, next) {
    var isAdmin = req.session.isAdmin;
    if(isAdmin){
        var sql = "SELECT * FROM xbee_list WHERE type in (1, 2, 3, 12, 13, 14, 18)";
    }else{
        var sql = "SELECT * FROM xbee_list WHERE is_admin = 0";
    }
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.render('environment', {
            title: '环境监测',
            layout: layout,
            list: rows,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin,
            name: req.session.name
        });
    });
});

router.get('/search', function(req, res, next) {
    if (req.query.search) {
        var str = req.query.search;
        common.fetchLibraryBookList(str, null, 'any', null, function(err, data) {
            if (err) return console.log(err);
            res.render('search', {
                title: '书籍检索',
                layout: layout,
                data: data,
                str: str,
                isLogin: req.session.isLogin,
                isAdmin: req.session.isAdmin,
                name: req.session.name
            });
        });
    } else {
        res.render('search', {
            title: '书籍检索',
            layout: layout,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin,
            name: req.session.name
        });
    }
});

router.all('/borrow', function(req, res, next) {
    if (!req.session.isLogin) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/borrow', function(req, res, next) {
    var studentId = req.session.studentId;
    var sql = "SELECT * FROM lend_view WHERE studentId = '" + studentId + "' AND isReturn = 0";
    mysql.query(sql, function (err, rows) {
        if (err) return console.log(err);
        var data = [];
        for(var i in rows){
            data.push({
                title: rows[i].title,
                author: rows[i].author,
                press: rows[i].press,
                lendTime: moment(rows[i].lendTime).format('YYYY-MM-DD'),
                returnTime: moment(rows[i].lendTime).add(20, 'day').format('YYYY-MM-DD')
            });
        }
        res.render('borrow', {
            title: '借阅查询',
            layout: layout,
            data: data,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin,
            name: req.session.name
        });
    });
});

router.all('/security', function(req, res, next) {
    if (!req.session.isAdmin) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/security', function(req, res, next) {
    var sql = "SELECT * FROM xbee_list WHERE type = 4 OR type = 5 OR type = 9 OR type = 10 OR type = 15";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.render('security', {
            title: '安防监测',
            layout: layout,
            list: rows,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin,
            name: req.session.name
        });
    });
});

router.all('/switch', function(req, res, next) {
    if (!req.session.isAdmin) {
        res.redirect('/');
    } else {
        next();
    }
});

router.get('/switch', function(req, res, next) {
    var sql = "SELECT * FROM xbee_list WHERE type = 9 OR type = 11";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.render('switch', {
            title: '开关控制',
            layout: layout,
            list: rows,
            isLogin: req.session.isLogin,
            isAdmin: req.session.isAdmin,
            name: req.session.name
        });
    });
});

module.exports = router;
