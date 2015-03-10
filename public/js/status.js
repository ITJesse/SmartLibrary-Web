$(document).ready(function() {
    var chartWidth = $("#chartDiv").width();
    var chartHeight = $("#chartDiv").height();
    $("#chart").attr("width", chartWidth);
    $("#chart").attr("height", chartWidth * 0.3);
    $(".chartLabel").css("height", chartHeight + "px");

    $('div#chart').each(function(i) {
        var id = $(this).data("id");
        $.ajax({
            url: './api/GetChartVal',
            type: 'get',
            dataType: 'json',
            data: 'id=' + id + '&startTime=',
            renderTo: $(this),
            success: function(res) {
                this.renderTo.highcharts({
                    chart: {
                        type: 'spline',
                        zoomType: 'x'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            minute: '%H:%M'
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },

                        minorGridLineWidth: 0,
                        gridLineWidth: 1,
                        alternateGridColor: null
                    },
                    tooltip: {
                        formatter: function() {
                            return '' +
                                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br><b>' + this.y + '</b>';
                        }
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    series: [{
                        data: res
                    }],
                    navigation: {
                        menuItemStyle: {
                            fontSize: '10px'
                        }
                    }
                });
            }
        });
    });

    $('span#lastVal').each(function(i){
        var id = $(this).data("id");
        $.ajax({
            url: './api/GetLastVal',
            ype: 'get',
            dataType: 'json',
            data: 'id=' + id,
            renderTo: $(this),
            success: function(res){
                this.renderTo.find('#sensorVal').text(res.value);
                this.renderTo.find('#lastUpdate').text(moment(res.time).format('YYYY-MM-DD HH:mm:ss'));
            }
        });
    });

});
