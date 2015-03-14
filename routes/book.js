var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');
var moment = require('moment');

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
        if (err) {
            console.log(err);
            return res.send('-1');
        } else {
            return res.send('1');
        }
    });
});

router.get('/CheckTagId', function(req, res) {
    var tagId = req.query.tagId;
    var sql = "SELECT tagId FROM book WHERE tagId = '" + tagId + "'";
    mysql.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send('-1');
        } else {
            if (rows[0]) {
                return res.send('-1');
            } else {
                return res.send('1');
            }
        }
    });
});

router.get('/GetBookList', function(req, res) {
    var sql = "SELECT title, author, isbn, publisher, time FROM book";
    mysql.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
            return res.send('-1');
        } else {
            var tableData = {
                data: []
            };
            for (var i in rows) {
                tableData.data[i] = [rows[i].title, rows[i].author, rows[i].isbn, rows[i].publisher, moment(rows[i].time).format('YYYY-MM-DD')];
            }
            return res.json(tableData);
        }
    });
});

module.exports = router;