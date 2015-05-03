var socket = io();
var liveCameraInterval, timer;

var resize = function() {
    var width = $('#liveCameraContainer').width();
    var height = $('#liveCameraContainer').height();
    if(width  * 0.75 < height){
        $('#liveCamera').height(width * 0.75);
    }else{
        $('#liveCamera').width(height / 0.75);
    }
}

var refresh = function(){
    $('.panel').each(function(){
        var sensorId = $(this).data().sensorid;
        var type = $(this).data().type;

        if(sensorId){
            var res = {};
            res.sensorId = sensorId;
            res.type = "1";
            socket.emit('control', res);
        }
    })
}

var startLiveCamera = function(){
    var timestamp = (new Date()).valueOf();
    $('#liveCamera').attr('src', '/API/Web/GetCameraImage?' + timestamp);
}

$(document).on('ready', function() {

    liveCameraInterval = setInterval(startLiveCamera, 1000);

    $('.iToggle-button#camera').toggleButtons({
        width: 70
    });

    $('#liveCameraSwitch').on('change', function(){
        if($(this).attr('checked') != 'checked'){
            clearInterval(liveCameraInterval);
        }else{
            clearInterval(liveCameraInterval);
            liveCameraInterval = setInterval(startLiveCamera, 1000);
        }
    });

    socket.on('connect', function () {

        console.log("Connect to the server");

        // timer = setInterval(refresh, 10000);

        socket.on('control return', function (data) {
            console.log("Data recived: " + JSON.stringify(data));

            $('.iToggle-button[data-sensorid='+data.sensorId+']').toggleButtons('destroy');

            var type = $('.switch[data-sensorid='+data.sensorId+']').data().type;

            if(type == 9 || type == 10){
                $('.switch[data-sensorid='+data.sensorId+']').html('<div class="panel-form right"><div data-sensorid="'+data.sensorId+'" class="iToggle-button"><input type="checkbox" data-sensorid="'+data.sensorId+'" class="nostyle"></div></div>');
            }else{
                $('.switch[data-sensorid='+data.sensorId+']').html('<span data-sensorid="'+data.sensorId+'" class="label label-success">安全</span>');
            }

            if(data.value == "1"){
                $('input[data-sensorid='+data.sensorId+']').attr('checked', 'checked');
                $('span[data-sensorid='+data.sensorId+']').removeClass('label-success');
                $('span[data-sensorid='+data.sensorId+']').addClass('label-danger');
                $('span[data-sensorid='+data.sensorId+']').text("不安全");
            }
            if(data.value == "0"){
                // $('input[data-sensorid='+data.sensorId+']').attr('checked', '');
                $('span[data-sensorid='+data.sensorId+']').addClass('label-success');
                $('span[data-sensorid='+data.sensorId+']').removeClass('label-danger');
                $('span[data-sensorid='+data.sensorId+']').text("安全");
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
                            console.log("Send: " + JSON.stringify(res));
                            socket.emit('control', res);
                        }else{
                            res.type = "3";
                            console.log("Send: " + JSON.stringify(res));
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

    resize();
    refresh();

});

$(window).on('resize', function() {
    resize();
});
