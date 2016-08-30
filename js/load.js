var map;
var searchlayer,polylayer;//搜索结果图层、多边形图层
var home_button;
var navigation_tool;
var templeb=true;
var open_temple = function () {
    if (templeb) {
        templelayer.show();
        templeb = false;
    }
    else {
        templelayer.hide();
        templeb = true;
    }
}
require([
  "dojo/dom",
   "dojo/dom-construct",
 "dojo/parser",
 "dojo/ready",
 "esri/map",
 "esri/geometry/Extent",
 "esri/InfoTemplate",
 "esri/dijit/InfoWindow",
 "esri/layers/ArcGISTiledMapServiceLayer",
 "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/GraphicsLayer",
  "extras/TDTLayer",
  "extras/TDTAnnoLayer",
  "esri/layers/FeatureLayer",
 "esri/toolbars/navigation",
  "esri/dijit/OverviewMap",
  "esri/dijit/Scalebar",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "esri/symbols/PictureMarkerSymbol",
  "esri/graphic",
  "esri/toolbars/draw",
   "esri/symbols/SimpleLineSymbol",
 "esri/symbols/SimpleFillSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/Color",
 "dojo/domReady!"
], function (dom,domConstruct, parser, ready, Map, Extent, InfoTemplate, InfoWindow, ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer, GraphicsLayer, TDTLayer, TDTAnnoLayer, FeatureLayer, Navigation,
    OverviewMap, Scalebar, Point, SpatialReference, PictureMarkerSymbol, Graphic,Draw,SimpleLineSymbol, SimpleFillSymbol,SimpleRenderer, Color) {
    ready(function () {
        var lods = [{
            "level": 3,
            "resolution": 19567.8792409999,
            "scale": 73957190.948944
        }, {
            "level": 4,
            "resolution": 9783.93962049996,
            "scale": 36978595.474472
        }, {
            "level": 5,
            "resolution": 4891.96981024998,
            "scale": 18489297.737236
        }, {
            "level": 6,
            "resolution": 2445.98490512499,
            "scale": 9244648.868618
        }, {
            "level": 7,
            "resolution": 1222.99245256249,
            "scale": 4622324.434309
        }, {
            "level": 8,
            "resolution": 611.49622628138,
            "scale": 2311162.217155
        }, {
            "level": 9,
            "resolution": 305.748113140558,
            "scale": 1155581.108577
        }, {
            "level": 10,
            "resolution": 152.874056570411,
            "scale": 577790.554289
        },
        {
            "level": 11,
            "resolution": 76.4370282850732,
            "scale": 288895.277144
        }, {
            "level": 12,
            "resolution": 38.2185141425366,
            "scale": 144447.638572
        }, {
            "level": 13,
            "resolution": 19.1092570712683,
            "scale": 72223.819286
        }, {
            "level": 14,
            "resolution": 9.55462853563415,
            "scale": 36111.909643
        }, {
            "level": 15,
            "resolution": 4.77731426794937,
            "scale": 18055.954822
        }, {
            "level": 16,
            "resolution": 2.38865713397468,
            "scale": 9027.977411
        }, {
            "level": 17,
            "resolution": 1.19432856685505,
            "scale": 4513.988705
        }];
         mapextent=new Extent(80, 5, 130, 60);
         map = new Map("mapdiv", { extent: mapextent, logo: false, lods: lods, slider: true });//, infoWindow: infoWindow 
        map.setMapCursor("pointer");
        var tiledMapServiceLayer = new ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer");
        map.addLayer(tiledMapServiceLayer);
        map.addLayer(tiledMapServiceLayer);
        templelayer = new FeatureLayer("http://education:6080/arcgis/rest/services/library/temple/MapServer/0", { outFields: ["*"], mode: FeatureLayer.MODE_SNAPSHOT });
        var symbol = new PictureMarkerSymbol('image/1.png', 20, 20);
        var render = new SimpleRenderer(symbol);
        templelayer.setRenderer(render);
        map.addLayer(templelayer);//添加祠堂图层
        templelayer.hide();
        polylayer = new GraphicsLayer();//用于存储多边形
        map.addLayer(polylayer);
        searchlayer = new GraphicsLayer();//用于存储搜索结果
        map.addLayer(searchlayer);
        searchlayer.on("click", function (evt) {
            var sGrapphic = evt.graphic;
            var iw = map.infoWindow;
            iw.setTitle(sGrapphic.attributes.place);
            iw.setContent("族谱:"+sGrapphic.attributes.workName + "<br/>"+ "修撰时间:" + sGrapphic.attributes.workyear + "年<br/>" + "先祖名人:" + sGrapphic.attributes.name_T_ + "<br/>");
            iw.show(evt.mapPoint, map.getInfoWindowAnchor(evt.mapPoint));
            //iw.setFixedAnchor("upperright");
            iw.resize(310, 100);
        });
        templelayer.on("click", function (evt) {
            var sGrapphic = evt.graphic;
            var iw = map.infoWindow;
            iw.setTitle(sGrapphic.attributes.name);
            iw.setContent("地点:" + sGrapphic.attributes.place + "<br/>" + "<img style='width:260px;height:240px' src='temple/" + sGrapphic.attributes.FID + ".jpg'/>");
            iw.show(evt.mapPoint, map.getInfoWindowAnchor(evt.mapPoint));
            //iw.setFixedAnchor("upperright");
            iw.resize(300, 500);
        });
        home_button = function () {
            map.setExtent(mapextent);
        };
        var navigation = new Navigation(map);
        navigation_tool = function (id) {
            switch (id) {
                case "former_view":
                    navigation.zoomToPrevExtent();
                    break;
                case "next_view":
                    navigation.zoomToNextExtent();
                    break;
            }
        };
        //比例尺
        var scalebar = new Scalebar({
            map: map,
            attachTo: "bottom-left",
            scalebarUnit: "dual"
        });
        //多边形选择工具
        var drawtool = new Draw(map);
        drawtool.on("draw-end", addToMap);
        $("#polygon").on('click', function () {
                map.graphics.clear();
                searchlayer.clear();
                polylayer.clear();
                map.disableMapNavigation();
                map.infoWindow.hide();
                drawtool.activate(this.id);
        });
        function addToMap(evt) {
            drawtool.deactivate();
            map.enableMapNavigation();
            var symbol= new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.1]));
            polylayer.add(new Graphic(evt.geometry, symbol));
            poly_search(evt.geometry);//执行多边形查询
        }
        //添加时间图层
        time_info();      
    })
});
