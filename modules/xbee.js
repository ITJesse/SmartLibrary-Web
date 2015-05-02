var mysql = require('../modules/mysql');
var async = require('async');

function xbee(mac, type, value, socket){
    this.mac = mac;
    this.type = type;
    this.value = value;
    this.socket = socket
}

xbee.prototype.insertSensorsDataIntoDatabase = function(){
    var _this = this;
    var sql = "INSERT INTO xbee_data (mac, type, value) VALUES ('"+ _this.mac +"', '"+ _this.type +"', '"+ _this.value +"')";
    mysql.query(sql, function(err){
        if(err) return console.log(err);
    });
};

xbee.prototype.checkUidForGateway = function(){
    var _this = this;
    var res = {};
    res.mac = _this.mac;
    res.type = "8";

    var sql = "SELECT * FROM student_bind WHERE uid = '"+ _this.value +"'";
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
        _this.socket.emit('data', res);
    });
};

xbee.prototype.getXbeeList = function(){
    var _this = this;
    var sql = "SELECT * FROM xbee_list WHERE auto_fetch = 1";
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
        _this.socket.emit('data', json);
    });
};

xbee.prototype.getStudyRoomSeat = function(){
    var _this = this;
    var res = {};
    res.mac = mac;
    res.type = "14";
    async.waterfall([
        function(callback){
            sql = "SELECT * FROM student_bind WHERE uid = '"+ _this.value +"'";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                if(!rows[0]){
                    callback('none user');
                }else{
                    callback(null, rows[0].studentId);
                }
            });
        },
        function(studentId, callback){
            sql = "SELECT * FROM study_room_seat WHERE (studentId = '"+studentId+"' AND isOut = 0) OR (studentId = '"+studentId+"' AND isOut = 1 AND (NOW() - outTime) < 1800)";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                if(!rows[0]){
                    callback(null, studentId);
                }else{
                    callback('already hava seat');
                }
            });
        },
        function(studentId, callback){
            sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND (NOW() - outTime) < 1800)";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                if(rows[0].used >= 3000){
                    callback('nono seat');
                }else{
                    callback(null, studentId);
                }
            });
        },
        function(studentId, callback){
            sql = "SELECT seat FROM study_room_seat WHERE isOut = 1 AND (NOW() - outTime) > 1800 LIMIT 1";
            mysql.query(sql, function(err, rows){
                if(err){
                    callback(err);
                }
                if(rows[0]){
                    callback(null, rows[0].seat, studentId);
                }else{
                    callback(null, null, studentId);
                }
            });
        },
        function(seat, studentId, callback){
            if(seat){
                sql = "UPDATE study_room_seat SET studentId = '"+studentId+"', isOut = 0, outTime = NULL WHERE seat = '"+seat+"'";
                mysql.query(sql, function(err, rows){
                    if(err){
                        callback(err);
                    }
                    callback(null, seat);
                });
            }else{
                sql = "INSERT INTO study_room_seat (studentId) VALUES ('"+studentId+"')";
                mysql.query(sql, function(err, rows){
                    if(err){
                        callback(err);
                    }
                    sql = "SELECT LAST_INSERT_ID() AS seat";
                    mysql.query(sql, function(err, rows){
                        if(err){
                            callback(err);
                        }
                        callback(null, rows[0].seat);
                    });
                });
            }
        }
    ], function(err, seat){
        if(err && err == 'none user'){
            res.value = '1'; //Invaild Card;
        }
        else if(err && err == 'none seat'){
            res.value = '2'; //No Empty Seat;
        }
        else if(err && err == 'already hava seat'){
            res.value = '3'; //Already Hava a Seat;
        }
        else if(err){
            console.log(err);
            res.value = '4'; //Error;
        }
        else{
            res.value = '0|' + seat;
        }
        _this.socket.emit('data', res);
    });
};

xbee.getStudyRoomUsed = function(){
    var _this = this;
    var res = {};
    res.mac = mac;
    res.type = "15";
    sql = "SELECT COUNT(studentId) AS used FROM study_room_seat WHERE isOut = 0 OR (isOut = 1 AND (NOW() - outTime) < 1800)";
    mysql.query(sql, function(err, rows){
        if(err){
            console.log(err);
        }
        // res.value = 3000 - rows[0].used - Math.floor(Math.random()*100); //测试用
        res.value = 3000 - rows[0].used;
        _this.socket.emit('data', res);
    });
};

module.exports = xbee;