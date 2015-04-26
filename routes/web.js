var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

/* GET home page. */
router.get('/GetChartVal', function(req, res, next) {
    var id = req.query.id;
    var startTime = req.query.startTime ? Math.ceil(((new Date()).valueOf() - req.query.startTime) / 1000) : Math.ceil(((new Date()).valueOf() - 10 * 60 * 1000) / 1000);
    var sql = "SELECT (UNIX_TIMESTAMP(xbee_data.time) + 8 * 60 * 60) * 1000 AS time, xbee_data.`value` FROM xbee_list INNER JOIN xbee_data ON xbee_list.mac = xbee_data.mac AND xbee_data.type = xbee_list.type WHERE xbee_list.id = " + id + " AND UNIX_TIMESTAMP(xbee_data.time) > " + startTime + " ORDER BY xbee_data.time ASC";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        var data = [];
        if(rows.length > 100){
            var radio = Math.floor(rows.length / 100);
            for(var i = 0; i < 100 * radio; i = i + radio){
                data.push([rows[i].time, parseFloat(rows[i].value)]);
            }
        }else{
            for(var i in rows){
                data.push([rows[i].time, parseFloat(rows[i].value)]);
            }
        }
        var sql = "SELECT name FROM xbee_list WHERE id = '"+id+"'";
        mysql.query(sql, function(err, rows) {
            if (err) return console.log(err);
            var result = {error: null, label: rows[0].name, data: data};
            res.json(result);
        });
    });
});

router.get('/GetLastVal', function(req, res, next) {
    var id = req.query.id;
    var sql = "SELECT xbee_data.`value`, xbee_list.unit, UNIX_TIMESTAMP(xbee_data.`time`) * 1000 AS time FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '" + id + "' ORDER BY xbee_data.time DESC LIMIT 1";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.json(rows[0]);
    });
});


module.exports = router;
