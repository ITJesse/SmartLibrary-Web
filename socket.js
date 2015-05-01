var mysql = require('./modules/mysql');
var async = require('async');

module.exports = function(io){

    io.on('connection', function(socket){
        console.log('RaspberryPi Connected!');

        socket.on('disconnect', function(){
            console.log('RaspberryPi Disconnected!');
        });

        socket.on('data', function(data) {
            console.log('Data: ' + JSON.stringify(data));
            var mac = data.mac;
            var type = data.type;
            var value = data.value;
            var sql = '';

            switch(type){
                case "1":
                case "2":
                case "3":
                case "12":
                case "13":
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
                    res.type = "8";
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
                        socket.emit('data', res);
                    });
                    break;
                case "7":
                case "8":
                case "9":
                case "10":
                case "11":
                    break;
                case "100":
                    sql = "SELECT * FROM xbee_list WHERE type <= 4";
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
                        socket.emit('data', json);
                    });
                    break;
                case "14":
                    var res = {};
                    res.mac = mac;
                    res.type = "14";
                    async.waterfall([
                        function(callback){
                            sql = "SELECT * FROM student_bind WHERE uid = '"+value+"'";
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
                        socket.emit('data', res);
                    });
                    break;
                case "15":
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
                        socket.emit('data', res);
                    });
                    break;
                default:
            }
        });
    });
};
