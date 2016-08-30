
var time_info;
var time_url = "http://education:6080/arcgis/rest/services/library/place/MapServer";//时间图层
var time_layer;
require([
  "esri/toolbars/draw",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "dojo/colors",
  "esri/graphic",
  "esri/InfoTemplate",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/FeatureLayer",
  "esri/TimeExtent",
  "esri/dijit/TimeSlider",
  "dojo/_base/array"], function (Draw, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color, Graphic, InfoTemplate,
    ArcGISDynamicMapServiceLayer,FeatureLayer, TimeExtent, TimeSlider, arrayUtils)
{
    var timeSlider;
    time_info = function () {
        //var popupTemplate = new InfoTemplate("${workName}", "修撰时间:${year}<br/>");
         time_layer = new ArcGISDynamicMapServiceLayer(time_url);
        //time_layer.setInfoTemplates({ 0: { infoTemplate: popupTemplate } });
       // var time_layer = new FeatureLayer(time_url+"/0", { outFields: ["*"], mode: FeatureLayer.MODE_SNAPSHOT });
        map.addLayer(time_layer);//时间控制图层
        time_layer.hide();
         timeSlider = new TimeSlider({style: "width: 100%;" },dojo.byId("time_slider"));
        map.setTimeSlider(timeSlider);
        // timeSlider.play();//开始播放
        //timeSlider.loop = true;//循环播放
        var timeExtent = new TimeExtent();
        timeExtent.startTime = new Date("1/1/1500 UTC");
        timeExtent.endTime = new Date("12/31/2006 UTC");
        timeSlider.setThumbCount(2);//设置成2表示显示一个时间范围,1代表一个时间点
        timeSlider.createTimeStopsByTimeInterval(timeExtent,25, "esriTimeUnitsYears");//数字10代表一次间隔是10年
        //  timeSlider.setThumbIndexes([0,1]);
        timeSlider.setThumbMovingRate(1000);//播放速度
        timeSlider.startup();
        var labels = arrayUtils.map(timeSlider.timeStops, function (timeStop, i) {
            if (i %1 === 0) {//数字除以几下标时间间隔就是几
                return timeStop.getUTCFullYear();
            } else {
                return "";
            }
        });
        timeSlider.setLabels(labels);//用来设置时间轴下的时间数字
        timeSlider.on("time-extent-change", function (evt) {
            myevent = evt;
            var endValString = evt.endTime.getUTCFullYear();
            dojo.byId("date_range").innerHTML = "<i>" + endValString + "年<\/i>";
        });
        //time_layer.on("click", function (evt) {
        //    map.graphics.clear();
        //    var sGrapphic = evt.graphic;
        //    var iw = map.infoWindow;
        //    iw.setTitle(sGrapphic.attributes.workName);
        //    iw.resize(180, 100);
        //    iw.setContent("校友数量:" );
        //    iw.show(evt.mapPoint, map.getInfoWindowAnchor(evt.mapPoint));
        //})
    }
})

