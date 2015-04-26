$(document).on('ready', function() {
    setInterval(function(){
        var timestamp = (new Date()).valueOf();
        $('#liveCamera').attr('src', '/API/Web/GetCameraImage?' + timestamp);
    }, 2000);
});
