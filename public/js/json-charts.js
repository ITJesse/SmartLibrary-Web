// document ready function
$(document).ready(function() {

    var divElement = $('div'); //log all div elements

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        cache: false, //change to true in production app
        url: "json/simple-chart.json",
        data: "{dataFor: 'simple-chart'}",
		dataType: "json",
        success: function(msg) {
            var data = msg.data;
            var label = msg.label;
            var placeholder = $(".simple-chart");
			console.log(msg.data);
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
                yaxis: {
                    min: 0
                },
                colors: chartColours,
                shadowSize: 1,
                tooltip: true, //activate tooltip
                tooltipOpts: {
                    content: "%s : %y.0",
                    shifts: {
                        x: -30,
                        y: -50
                    }
                }
            };
			placeholder.each(function(i, item){
				var tmp = [];
				$.extend(true, tmp, data);

	            $.plot(item, [{
	                    label: label,
	                    data: tmp,
	                    lines: {
	                        fillColor: "#f2f7f9"
	                    },
	                    points: {
	                        fillColor: "#88bbc8"
	                    }
	                }

	            ], options);
			});
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Error" + XMLHttpRequest.responseText);
        }
    });

}); //End document ready functions

var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];
