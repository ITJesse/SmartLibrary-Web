var mysql = require('mysql');
var db_config = require('./config');

var connection = mysql.createConnection({
    host: db_config.mysql.host,
    user: db_config.mysql.user,
    password: db_config.mysql.password,
    database: db_config.mysql.database
});

connection.connect();

exports.connect = function() {
    connection.connect();
};

exports.end = function() {
    connection.end();
};

exports.query = function(sql, callback) {
    //connection.connect();
    connection.query(sql, function(err, rows, fields) {
        if (db_config.mysql.debug) console.log("Execute SQL:" + sql);
        if (err) return callback(err);
        //connection.end();
        return callback(err, rows, fields);
    });
};

exports.connection = connection;