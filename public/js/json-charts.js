// document ready function
$(document).ready(function() { 	

	var divElement = $('div'); //log all div elements

	//Simple chart 
    if (divElement.hasClass('simple-chart')) {

		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			cache:false, //change to true in production app
			url: "json/simple-chart.json",
			data: "{dataFor: 'simple-chart'}",
			success:
				function(msg) {
					var data = msg.data;
			    	var label = msg.label;
			    	var placeholder = $(".simple-chart");		

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
		    			label: label, 
		    			data: data,
		    			lines: {fillColor: "#f2f7f9"},
		    			points: {fillColor: "#88bbc8"}
		    		}

		    	], options);
				},
			error:
				function(XMLHttpRequest, textStatus, errorThrown) {        
				alert("Error" + XMLHttpRequest.responseText);
			}
		});
	}//end if

});//End document ready functions

var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];

//sparkline in sidebar area
var positive = [1,5,3,7,8,6,10];
var negative = [10,6,8,7,3,5,1]
var negative1 = [7,6,8,7,6,5,4]

$('#stat1').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
$('#stat2').sparkline(negative,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat3').sparkline(negative1,{
	height:15,
	spotRadius: 0,
	barColor: '#ED7A53',
	type: 'bar'
});
$('#stat4').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});
//sparkline in widget
$('#stat5').sparkline(positive,{
	height:15,
	spotRadius: 0,
	barColor: '#9FC569',
	type: 'bar'
});

$('#stat6').sparkline(positive, { 
	width: 70,//Width of the chart - Defaults to 'auto' - May be any valid css width - 1.5em, 20px, etc (using a number without a unit specifier won't do what you want) - This option does nothing for bar and tristate chars (see barWidth)
	height: 20,//Height of the chart - Defaults to 'auto' (line height of the containing tag)
	lineColor: '#88bbc8',//Used by line and discrete charts to specify the colour of the line drawn as a CSS values string
	fillColor: '#f2f7f9',//Specify the colour used to fill the area under the graph as a CSS value. Set to false to disable fill
	spotColor: '#e72828',//The CSS colour of the final value marker. Set to false or an empty string to hide it
	maxSpotColor: '#005e20',//The CSS colour of the marker displayed for the maximum value. Set to false or an empty string to hide it
	minSpotColor: '#f7941d',//The CSS colour of the marker displayed for the mimum value. Set to false or an empty string to hide it
	spotRadius: 3,//Radius of all spot markers, In pixels (default: 1.5) - Integer
	lineWidth: 2//In pixels (default: 1) - Integer
});