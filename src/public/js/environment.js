var options = {
    grid: {
        show: true,
        aboveData: true,
        color: "#3f3f3f",
        labelMargin: 5,
        axisMargin: 0,
        borderWidth: 0,
        borderColor: null,
        minBorderMargin: 5,
        clickable: true,
        hoverable: true,
        autoHighlight: true,
        mouseActiveRadius: 20
    },
    series: {
        grow: {
            active: true,
            stepMode: "linear",
            steps: 50,
            stepDelay: true
        },
        lines: {
            show: true,
            fill: true,
            lineWidth: 4,
            steps: false
        },
        points: {
            show: true,
            radius: 5,
            symbol: "circle",
            fill: true,
            borderColor: "#fff"
        }
    },
    legend: {
        position: "ne",
        margin: [0, -25],
        noColumns: 0,
        labelBoxBorderColor: null,
        labelFormatter: function(label, series) {
            // just add some space to labes
            return label + '&nbsp;&nbsp;';
        }
    },
    xaxis: {
        mode: "time",
        timeformat: "%m/%d %H:%M",
        timezone: "browser"
    },
    yaxis: {
        min: 0
    },
    colors: ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'],
    shadowSize: 1,
    tooltip: true, //activate tooltip
    tooltipOpts: {
        content: "%s : %y.1",
        shifts: {
            x: -30,
            y: -50
        }
    }
};

var getChartValues = function(chart, sensorId, startTime){
    $.ajax({
        type: "GET",
        url: "/API/Web/GetChartVal?id="+sensorId+"&startTime="+startTime,
		dataType: "json",
        success: function(msg) {
            if(!msg.error){
                var data = msg.data;
                var label = msg.label;
                $.plot(chart, [{
                        label: label,
                        data: data,
                        lines: {
                            fillColor: "#f2f7f9"
                        },
                        points: {
                            fillColor: "#88bbc8"
                        }
                    }
                ], options);
            }else{
                console.log(msg);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Error" + XMLHttpRequest.responseText);
        }
    });
}

// document ready function
$(document).ready(function() {

    var divElement = $('div'); //log all div elements

    $('.simple-chart').each(function(index, item){
        var sensorId = $(this).data('sensorid');
        getChartValues(item, sensorId, null);
    });

    $('.timeSelect').on('click', 'li', function(){
        var sensorId = $(this).parent().data().chartid;
        var startTime = $(this).data().starttime;
        getChartValues($('[data-sensorId='+sensorId+']'), sensorId, startTime);
    });

}); //End document ready functions
