var chartWidth = $("#tempChart").width();

$("canvas").attr("width", chartWidth);
$("canvas").attr("height", chartWidth * 0.3);
var chartHeight = $("#tempChart").height();
$(".chartLabel").css("height", chartHeight + "px");

var tempCtx = $("#temp").get(0).getContext("2d");
var humCtx = $("#hum").get(0).getContext("2d");
var countCtx = $("#count").get(0).getContext("2d");

var data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
    datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        data: [21.6, 22.3, 23.3, 22.4, 21.9, 20.1, 21.6, 22.3, 23.3, 22.4, 21.9, 20.1, 21.6, 22.3, 23.3, 22.4, 21.9, 20.1]
    }]
}
var tempChart = new Chart(tempCtx).Line(data);
var humChart = new Chart(humCtx).Line(data);
var countChart = new Chart(countCtx).Line(data);
