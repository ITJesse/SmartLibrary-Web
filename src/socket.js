var Xbee = require('./modules/xbee');
var mysql = require('./modules/mysql');

module.exports = function(io){

    io.on('connection', function(socket){
        console.log('RaspberryPi Connected!');

        socket.on('disconnect', function(){
            console.log('RaspberryPi Disconnected!');
        });

        socket.on('control', function(data){
            // console.log('Web control: ' + JSON.stringify(data));
            var sensorId = data.sensorId;
            var type = data.type;

            var sql = "SELECT mac, type FROM xbee_list WHERE id = '"+ sensorId +"'";
            mysql.query(sql, function(err, rows){
                if(err) return console.log(err);
                if(rows[0]){
                    var mac = rows[0].mac;
                    var sensorType = rows[0].type;
                    var xbee = new Xbee(mac, sensorType, sensorId, socket);

                    switch(type){
                        case "1":
                            xbee.getSensorData();
                            break;
                        case "2":
                            xbee.setSwitchOn();
                            break;
                        case "3":
                            xbee.setSwitchOff();
                            break;
                        default:
                    }
                }
            });
        });

        socket.on('control return', function(data){
            var mac = data.mac;
            var type = data.type;
            var value = data.value;
        });

        socket.on('data', function(data) {
            console.log('Data: ' + JSON.stringify(data));
            var mac = data.mac;
            var type = data.type;
            var value = data.value;
            var xbee = new Xbee(mac, type, value, socket);

            switch(type){
                case "1"://温度
                case "2"://湿度
                case "3"://亮度
                case "12"://内存
                case "13"://负载
                case "14"://CPU温度
                case "18"://PM2.5
                    xbee.insertSensorsDataIntoDatabase();
                    break;
                case "4"://烟雾
                case "5"://人体红外
                case "9"://风扇
                case "10"://声光报警
                case "11"://电灯
                case "17"://门磁
                    xbee.returnSensorDataToWeb();
                    break;
                case "6"://门禁读卡器
                    xbee.checkUidForGateway();
                    break;
                case "7"://二维码
                    xbee.checkQRCodeForGateway();
                    break;
                case "8"://门禁
                    break;
                case "15"://获取自习室座位号
                    xbee.getStudyRoomSeat();
                    break;
                case "16"://获取自习室空位
                    xbee.getStudyRoomUsed();
                    break;
                case "99":
                    xbee.getAlarmList();
                    break;
                case "100":
                    xbee.getXbeeList();
                    break;
                default:
            }
        });
    });
};
