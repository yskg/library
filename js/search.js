
var search_execute, hsearch, poly_search;//模糊查询、高级查询、多边形查询
var search_url = "http://education:6080/arcgis/rest/services/library/place/MapServer";//查询地址
var open_time = function () {
    if ($("#time_info").css("display") == "none") {
        $("#time_info").css("display", "block");
        time_layer.show();
    }
    else {
        $("#time_info").css("display", "none");
        time_layer.hide();
    }
}
var close_timeline = function () {
    $("#time_info").css("display", "none");
    time_layer.hide();

}
var clear_search = function () {
    map.graphics.clear();
    searchlayer.clear();
    map.infoWindow.hide();
    polylayer.clear();
    $("#search_results").css("display", "none");
};

var open_search = function () {
    if ($("#searchperson").css("display") == "none") {
        $("#searchperson").css("display","block");
    }
    else $("#searchperson").css("display", "none");
}
var position_feature = function (id) {
    //遍历地图的图形查找FID和点击行的FID相同的图形
    var sGrapphic;
    for (var i = 0; i < searchlayer.graphics.length; i++) {
        var cGrapphic = searchlayer.graphics[i];
        if ((cGrapphic.attributes) && cGrapphic.attributes.FID == id) {
            sGrapphic = cGrapphic;
            break;
        }
    }
    var sGeometry = sGrapphic.geometry;
    var iw = map.infoWindow;
    iw.resize(310, 100);
    iw.setTitle(sGrapphic.attributes.place);
    iw.setContent("族谱:" + sGrapphic.attributes.workName + "<br/>" + "修撰时间:" + sGrapphic.attributes.workyear + "年<br/>" + "先祖名人:" + sGrapphic.attributes.name_T_ + "<br/>");
    iw.show(sGeometry, map.getInfoWindowAnchor(sGeometry));
    //iw.setFixedAnchor("upperright");
    map.centerAt(sGeometry);
};
//根据输入的关键字进行findTask操作
require([
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
   "esri/symbols/PictureMarkerSymbol",
   "esri/geometry/Point",
   "esri/InfoTemplate"
], function (FindTask, FindParameters,QueryTask,Query, PictureMarkerSymbol, Point, InfoTemplate) {
    search_execute = function (searchtext) {
        if (searchtext != "") {
            map.infoWindow.hide();
            map.graphics.clear();
            searchlayer.clear();
            polylayer.clear();
            //初始化查询
            var findTask = new FindTask(search_url);
            findParams = new FindParameters();
            findParams.returnGeometry = true;
            findParams.layerIds = [0];//查询的图层专科、本科
            findParams.searchFields = ["place", "workyear", "familyName", "workName", "name_T_"] // 查询字段设置
            findParams.contains = true;//不严格匹配输入的字段
            findParams.searchText = searchtext;
            findTask.execute(findParams, search_Results);
        }
    }

    function search_Results(results) {
        var symbol = new PictureMarkerSymbol('image/location.png', 20, 20);
        var innerHtml = "";
        if (results.length == 0) {
            alert("未搜到匹配结果");
        }
        else {
            for (var i = 0; i < results.length; i++) {
                var curFeature = results[i];
                graphic = curFeature.feature;
                graphic.setSymbol(symbol);
                searchlayer.add(graphic);
                innerHtml += "<img src='image/location.png'style='width:23px;height:23px;'/><a class='itemname' href='javascript:position_feature(" + graphic.attributes.FID + ")'>" + graphic.attributes.workName + "</a><br/>";
            };
            $("#search_results").css("display", "block");
            dojo.byId("search_items").innerHTML = innerHtml;
            $("#rnumber").html("查询结果:" + results.length + "条");
        }
    };
    hsearch = function () {
        map.infoWindow.hide();
        map.graphics.clear();
        searchlayer.clear();
        polylayer.clear();
        querystr = "";
        if ($("#fname").val().trim() != "")
        {
            querystr = querystr+"familyName like '%"+$("#fname").val().trim()+"%'";
           
        }
        if ($("#fperson").val().trim() != "") {
            querystr = querystr+" and " + "name_T_ like '%" + $("#fperson").val().trim() + "%'";
        }
         if ($("#faddress").val().trim() != "") {
            querystr = querystr+" and " + "place like '%" + $("#faddress").val().trim() + "%'";
        }
        if ($("#ftime").val().trim() != "") {
            querystr = querystr+" and " + "workyear =" + $("#ftime").val().trim();
        }
        var queryTask = new QueryTask(search_url + "/0");
        var query = new Query();
        query.returnGeometry = true;
        query.geometry = mapextent;
        query.outFields = ["FID","place", "workyear", "familyName", "workName", "name_T_"];
        query.where = querystr;
        if (querystr != "") {
            queryTask.execute(query, showResults);
        }
    }

    function showResults(results) {
        var symbol = new PictureMarkerSymbol('image/location.png', 20, 20);
        var innerHtml = "";
        dojo.byId("search_items").innerHTML = innerHtml;
        if (results.features.length == 0) {
            alert("未搜到匹配结果");
        }
        else {
            for (var i = 0; i < results.features.length; i++) {
                var graphic = results.features[i];
                graphic.setSymbol(symbol);
                searchlayer.add(graphic);
                innerHtml += "<img src='image/location.png'style='width:23px;height:23px;'/><a class='itemname' href='javascript:position_feature(" + graphic.attributes.FID + ")'>" + graphic.attributes.workName + "</a><br/>";
            };
            $("#search_results").css("display", "block");
            dojo.byId("search_items").innerHTML = innerHtml;
            $("#rnumber").html("查询结果:" + results.features.length + "条");
        }
    };
    poly_search = function (geometry) {
        map.infoWindow.hide();
        searchlayer.clear();
        var queryTask = new QueryTask(search_url + "/0");
        var query = new Query();
        query.returnGeometry = true;
        query.geometry = geometry;
        query.outFields = ["FID","place", "workyear", "familyName", "workName", "name_T_"];
        queryTask.execute(query, showResults);
    }
})