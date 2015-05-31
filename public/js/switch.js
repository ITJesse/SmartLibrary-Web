var socket = io();

var refresh = function(){
    $('.panel').each(function(){
        var sensorId = $(this).data().sensorid;
        var type = $(this).data().type;

        if(sensorId){
            var res = {};
            res.sensorId = sensorId;
            res.type = "1";
            console.log("Send control: " + JSON.stringify(res));
            socket.emit('control', res);
        }
    })
}

$(document).on('ready', function() {

    socket.on('connect', function () {

        console.log("Connect to the server");

        socket.on('control return', function (data) {
            console.log("Data recived: " + JSON.stringify(data));

            $('.iToggle-button[data-sensorid='+data.sensorId+']').toggleButtons('destroy');

            var type = $('.switch[data-sensorid='+data.sensorId+']').data().type;

            $('.switch[data-sensorid='+data.sensorId+']').html('<div class="panel-form right"><div data-sensorid="'+data.sensorId+'" class="iToggle-button"><input type="checkbox" data-sensorid="'+data.sensorId+'" class="nostyle"></div></div>');

            if(data.value == "1"){
                $('input[data-sensorid='+data.sensorId+']').attr('checked', 'checked');
            }
            if(data.value == "0"){

            }

            $('.iToggle-button[data-sensorid='+data.sensorId+']').toggleButtons({
        	    width: 70,
                onChange: function(item, status, event){
                    var sensorId = item.find('input').data().sensorid;
                    if(sensorId){
                        var res = {};
                        res.sensorId = sensorId;
                        if(status){
                            res.type = "2";
                            console.log("Send control: " + JSON.stringify(res));
                            socket.emit('control', res);
                        }else{
                            res.type = "3";
                            console.log("Send control: " + JSON.stringify(res));
                            socket.emit('control', res);
                        }
                    }
                }
        	});

        });

    });

    socket.on('disconnect', function(){
        // $('.panel input').off();
        // clearInterval(timer);
        $('.iToggle-button').toggleButtons('destroy');
        console.log('Disconnect to the Server!');
    });

    socket.on('reconnect', function() {
        console.log('Reconnect to the Server!');
    });

    refresh();

});
