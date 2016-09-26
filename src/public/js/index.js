// document ready function
$(document).ready(function() {
	//温度
	$(".redCircle").knob({
        'min':0,
        'max':40,
        'readOnly': true,
        'width': 80,
        'height': 80,
        'fgColor': '#9FC569',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true
    });
	//亮度
	$(".greenCircle").knob({
        'min':0,
        'max':4,
        'readOnly': true,
        'width': 80,
        'height': 80,
        'fgColor': '#ED7A53',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true
    });
	//湿度
	$(".blueCircle").knob({
        'min':0,
        'max':100,
        'readOnly': true,
        'width': 80,
        'height': 80,
        'fgColor': '#88BBC8',
        'dynamicDraw': true,
        'thickness': 0.2,
        'tickColorizeValues': true
    });


	var divElement = $('div'); //log all div elements

	//------------- Visitor chart -------------//

	if (divElement.hasClass('visitors-chart')) {
		$(function () {
			//some data
			var d1 = [[8, 1000+randNum()*100+randNum()],[9, 1500+randNum()*100+randNum()],[10, 1800+randNum()*100+randNum()],[11, 2000+randNum()*100+randNum()],[12, 2200+randNum()*100+randNum()],[13, 2500+randNum()*100+randNum()],[14, 2600+randNum()*100+randNum()],[15, 2700+randNum()*100+randNum()],[16, 2700+randNum()*100+randNum()],[17, 2500+randNum()*100+randNum()],[18, 2500+randNum()*100+randNum()],[19, 2500+randNum()*100+randNum()],[20, 1800+randNum()*100+randNum()],[21, 1200+randNum()*100+randNum()],[22, 800+randNum()*100+randNum()]];
			var d2 = [[8, 500+randNum()],[9, 600+randNum()],[10, 600+randNum()],[11, 600+randNum()],[12, 200+randNum()],[13, 300+randNum()],[14, 400+randNum()],[15, 400+randNum()],[16, 400+randNum()],[17, 500+randNum()],[18, 500+randNum()],[19, 200+randNum()],[20, 200+randNum()],[21, 300+randNum()],[22, 300+randNum()]];
			//define placeholder class
			var placeholder = $(".visitors-chart");
			//graph options
			var options = {
					grid: {
						show: true,
					    aboveData: true,
					    color: "#3f3f3f" ,
					    labelMargin: 5,
					    axisMargin: 0,
					    borderWidth: 0,
					    borderColor:null,
					    minBorderMargin: 5 ,
					    clickable: true,
					    hoverable: true,
					    autoHighlight: true,
					    mouseActiveRadius: 20
					},
			        series: {
			        	grow: {
			        		active: false,
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
			            	show:true,
			            	radius: 5,
			            	symbol: "circle",
			            	fill: true,
			            	borderColor: "#fff"
			            }
			        },
			        legend: {
			        	position: "ne",
			        	margin: [0,-25],
			        	noColumns: 0,
			        	labelBoxBorderColor: null,
			        	labelFormatter: function(label, series) {
						    // just add some space to labes
						    return label+'&nbsp;&nbsp;';
						 }
			    	},
			        yaxis: { min: 0 },
			        xaxis: {ticks:11, tickDecimals: 0},
			        colors: chartColours,
			        shadowSize:1,
			        tooltip: true, //activate tooltip
					tooltipOpts: {
						content: "%s : %y.0",
						shifts: {
							x: -30,
							y: -50
						}
					}
			    };

	        	$.plot(placeholder, [

	        		{
	        			label: "图书馆访客",
	        			data: d1,
	        			lines: {fillColor: "#f2f7f9"},
	        			points: {fillColor: "#88bbc8"}
	        		},
	        		{
	        			label: "在线访客",
	        			data: d2,
	        			lines: {fillColor: "#fff8f2"},
	        			points: {fillColor: "#ed7a53"}
	        		}

	        	], options);

	    });
    }//end if

}); //End document ready functions
//generate random number for charts
randNum = function(){
	//return Math.floor(Math.random()*101);
	return (Math.floor( Math.random()* (1+40-20) ) ) + 20;
}

var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

$('#datepicker-inline').datepicker({
	inline: true,
	showOtherMonths:true
});
