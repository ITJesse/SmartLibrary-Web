var mysql = require('./modules/mysql');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('ok');
});

module.exports = function(sock){

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    // sock.on('connection', function(sock){
    //     console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    // });

    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        var json = JSON.parse(data);
        var mac = json.mac;
        var type = json.type;
        var value = json.value;
        var sql = '';

        switch(type){
            case "1":
            case "2":
            case "3":
                sql = "INSERT INTO xbee_data (mac, type, value) VALUES ('"+mac+"', '"+type+"', '"+value+"')";
                mysql.query(sql, function(err){
                    if(err) return console.log(err);
                });
                break;
            case "4":
            case "5":
            case "6":
                var res = {};
                res.mac = mac;
                res.type = 8;
                sql = "SELECT * FROM student_bind WHERE uid = '"+value+"'";
                mysql.query(sql, function(err, rows){
                    if(err){
                        res.value = '0';
                        return console.log(err);
                    }
                    if(!rows[0]){
                        res.value = '0';
                    }else{
                        res.value = '1';
                    }
                    sock.write(JSON.stringify(res));
                });
                break;
            case "7":
            case "8":
            case "9":
            case "10":
            case "11":
                break;
            case "100":
                sql = "SELECT * FROM xbee_list";
                var xbeeList = [];
                mysql.query(sql, function(err, rows){
                    if(err){
                        return callback(err);
                    }
                    for(var i in rows){
                        xbeeList.push(rows[i]);
                    }
                    // console.log(xbeeList);
                    var json = {type: "100", value: xbeeList};
                    sock.write(JSON.stringify(json));
                });
                break;
            default:
        }
    });

    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
};
