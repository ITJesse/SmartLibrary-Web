var express = require('express');
var router = express.Router();

var mysql = require('../modules/mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    var id = req.query.id;
    var sql = "SELECT xbee_data.`value`, xbee_data.unit, UNIX_TIMESTAMP(xbee_data.`time`) * 1000 AS time FROM xbee_data,xbee_list WHERE xbee_data.mac = xbee_list.mac AND xbee_data.type = xbee_list.type AND xbee_list.id = '" + id + "' ORDER BY xbee_data.time DESC LIMIT 1";
    mysql.query(sql, function(err, rows) {
        if (err) return console.log(err);
        res.json(rows[0]);
    });
});

module.exports = router;
