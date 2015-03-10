var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var startTime = req.query.startTime ? req.query.startTime : (new Date()).valueOf() - 10 * 60 * 1000;
    var sql = "SELECT xbee_data.`value`, UNIX_TIMESTAMP(xbee_data.`time`) AS time FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '" + id + "' AND xbee_data.time > " + startTime + " ORDER BY xbee_data.time ASC";
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
