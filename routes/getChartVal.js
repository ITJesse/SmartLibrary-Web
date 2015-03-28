var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var startTime = req.query.startTime ? Math.ceil(((new Date()).valueOf() - req.query.startTime) / 1000) : Math.ceil(((new Date()).valueOf() - 10 * 60 * 1000) / 1000);
    var sql = "SELECT UNIX_TIMESTAMP(xbee_data.time) * 1000 AS time, xbee_data.`value` FROM xbee_list INNER JOIN xbee_data ON xbee_list.mac = xbee_data.mac AND xbee_data.type = xbee_list.type WHERE xbee_list.id = " + id + " AND UNIX_TIMESTAMP(xbee_data.time) > " + startTime + " ORDER BY xbee_data.time ASC";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        var data = [];
        for (var i in rows) {
            data[i] = [rows[i].time, parseFloat(rows[i].value)];
        }
        res.json(data);
    });
});

module.exports = router;
