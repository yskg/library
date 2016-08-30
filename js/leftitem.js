var leftobject = {
    //为左边条目添加单击事件
    left_click: function () {
        var parentp = $(this).parent();//p的直接父元素div
        var allp = $(parentp).children("p");//div下所有的p元素
        for (var i = 0; i < allp.length; i++) {
            $(allp[i]).css("background-color", "#FFFFFF");
        }
        $(this).css("background-color", "#D3D3D3");
        var indexp = $(allp).index($(this));//元素属于第几列
        var alldiv = $(parentp).nextAll();
        for (var i = 0; i < alldiv.length; i++) {
            $(alldiv[i]).css("display", "none");
        }
        $(alldiv[indexp + 1]).css("display", "block");
        searchobject.click_execute(this.innerHTML, "leftitem");//执行查询服务
    },
    //为右边条目添加单击事件
    right_click: function () {
        searchobject.click_execute(this.innerHTML, "rightitem");//执行查询服务
    }
};
