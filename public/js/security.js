var liveCameraInterval;

var resize = function() {
    var width = $('#liveCameraContainer').width();
    var height = $('#liveCameraContainer').height();
    if(width  * 0.75 < height){
        $('#liveCamera').height(width * 0.75);
    }else{
        $('#liveCamera').width(height / 0.75);
    }
}

var startLiveCamera = function(){
    var timestamp = (new Date()).valueOf();
    $('#liveCamera').attr('src', '/API/Web/GetCameraImage?' + timestamp);
}

$(document).on('ready', function() {

    $('.iToggle-button').toggleButtons({
	    width: 70,
	    label: {
	        enabled: "<span class='icon16 icomoon-icon-checkmark-2 white'></span>",
	        disabled: "<span class='icon16 icomoon-icon-close white marginL5'></span>"
	    }
	});

    liveCameraInterval = setInterval(startLiveCamera, 1000);

    $('#liveCameraSwitch').on('change', function(){
        if($(this).attr('checked') != 'checked'){
            clearInterval(liveCameraInterval);
        }else{
            clearInterval(liveCameraInterval);
            liveCameraInterval = setInterval(startLiveCamera, 1000);
        }
    });

    resize();

});

$(window).on('resize', function() {
    resize();
});
