
var myjson;
function add_graphbar() {
    var familyname=new Array();
    var count=new Array();
    var add_bar = function () {
        var myChart = echarts.init(document.getElementById("bargraph"),'macarons');  //实例化的图表对象,后面是主题
        var option = {
            title: {
                text: "各姓氏族谱数量统计图"
            },
            toolbox: {
                //x:600,
                //y:10,
                show: true,
                feature: {
                    dataView: {
                        show: true,
                        title: '数据视图',
                        readOnly: false,
                        lang: ['数据视图', '关闭', '刷新']
                    },
                    magicType: {
                        show: true,
                        title: {
                            line: '动态类型切换-折线图',
                            bar: '动态类型切换-柱形图'
                        },
                        type: ['line', 'bar']
                    },
                    saveAsImage: {
                        show: true,
                        title: '保存为图片',
                        type: 'png',
                        lang: ['点击保存']
                    }
                }
            },
            tooltip: {
                show: true
            },
            dataZoom: {
                show: true,
                start: 0,
                end: 4,
                zoomLock: true
            },
            xAxis: [
                {
                    type: 'category',
                    'axisLabel': { 'interval': 0 },
                    name: "姓氏",
                    data: familyname
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: { show: true },
                    name: "族谱数量"
                }
            ],
            series: [
                {
                    "name": "数量",
                    "type": "bar",
                    "data": count
                }
            ]
        };
        myChart.setOption(option);
        // myChart.on(echarts.config.EVENT.CLICK, function () { alert("ss") });绑定事件
    }
    $.ajax({
        url: "handler/graphbar.json",
        dataType: "json",
        success: function (json) {
            for (var i = 0; i < json.length; i++) {
                familyname[i] = json[i].FamilyName;
                count[i] = json[i].count;
            }
            add_bar();
        }
    });

}

function add_wordCloud() {
    function createRandomItemStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    };
    data = new Array();
    function add_cloud() {
        var myChart = echarts.init(document.getElementById('worldcloud'));
        var option = {
            //title: {
            //    text: '字符云',
            //},
            tooltip: {
                show: false//每一项差距不大会出现显示错误
            },
            series: [{
                //name: '姓氏',
                type: 'wordCloud',
               // center: ["50%", "50%"],//中心位置
                size: ['1000px;', '1000px'],//整体大小
                textPadding: 0,//相邻字符间隔大小
                textRotation: [0, 45, 90, -45],
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 10//每个字符大小，会根据value值自动判断
                },
                data: data
            }]
        };
        // 为echarts对象加载数据 
        myChart.setOption(option);

    }
   $.ajax({
       url: "handler/graphbar.json",
       dataType: "json",
       success: function (json) {
           for (var i = 0; i < json.length; i++) {
               data[i] = {
                   name: json[i].FamilyName,
                   value: json[i].count,
                   itemStyle: createRandomItemStyle()
               }
           }
           add_cloud();
       }
   });

}
function add_chinamap() {
    var coordinate = {
        '淮阳': [114.892871, 33.736284],
        '山西': [112.541499, 37.908919],
        '新蔡': [114.993184, 32.754605],
        '陕西': [108.914644, 34.362764],
        '甘肃': [103.851217, 36.125206],
        '山东': [117.132804, 36.659592],
        '湖北': [114.307385, 30.615267],
        '安徽': [117.227827, 31.835904],
        '福建': [119.307639, 26.089439],
        '台湾': [120.432532, 23.736329],
        '开封': [114.310886, 34.804601],
        '南雄': [114.314403, 25.125073],
        '南昌': [115.858491, 28.687675],
        '河南': [113.58483, 34.802381],
        '台北': [121.489356, 25.11304],
        '山阴县': [112.821721, 39.533375],
        '福建长乐县': [119.53379, 25.969351],
        '鹿邑县': [115.49231, 33.865617],
        '都江堰': [103.651143, 30.992835],
        '河北': [115.101696, 37.940362],
        '安徽涡阳县': [116.221414, 33.498995],
        '陇西': [104.64075, 35.011389],
        '邯郸': [114.545952, 36.631685],
        '江西': [115.858491, 28.687675],
        '辽宁': [123.422049, 41.813795],
        '宁夏': [106.242278, 38.505768],
        '江苏': [119.36067, 32.142432],
        '湖南': [112.980783, 28.232423],
        '云南': [102.798935, 24.917407],
        '广州': [113.270506, 23.137967],
        '广东': [113.225172, 23.162531],
        '广西': [108.324864, 22.855277],
        '贵州': [106.617107, 26.653848],
        '海南': [109.959652, 19.299455]
    };
    var provincedata=[
   {
       "name": "台湾",
       "value": 118
   },
   {
       "name": "内蒙古",
       "value": 8
   },
   {
       "name": "云南",
       "value": 125
   },
   {
       "name": "河南",
       "value": 95
   },
   {
       "name": "贵州",
       "value": 130
   },
   {
       "name": "海南",
       "value": 137
   },
   {
       "name": "黑龙江",
       "value": 43
   },
   {
       "name": "江西",
       "value": 139
   },
   {
       "name": "四川",
       "value": 157
   },
   {
       "name": "湖南",
       "value": 138
   },
   {
       "name": "安徽",
       "value": 107
   },
   {
       "name": "天津",
       "value": 69
   },
   {
       "name": "陕西",
       "value": 42
   },
   {
       "name": "北京",
       "value": 66
   },
   {
       "name": "山东",
       "value": 105
   },
   {
       "name": "湖北",
       "value": 96
   },
   {
       "name": "吉林",
       "value": 50
   },
   {
       "name": "上海",
       "value": 129
   },
   {
       "name": "江苏",
       "value": 125
   },
   {
       "name": "广西",
       "value": 93
   },
   {
       "name": "辽宁",
       "value": 95
   },
   {
       "name": "山西",
       "value": 132
   },
   {
       "name": "河北",
       "value": 112
   },
   {
       "name": "甘肃",
       "value": 78
   },
   {
       "name": "澳门",
       "value": 3
   },
   {
       "name": "浙江",
       "value": 102
   },
   {
       "name": "重庆",
       "value": 175
   },
   {
       "name": "西藏",
       "value": 2
   },
   {
       "name": "福建",
       "value": 110
   },
   {
       "name": "青海",
       "value": 48
   },
   {
       "name": "广东",
       "value": 147
   },
   {
       "name": "香港",
       "value": 99
   },
   {
       "name": "陜西",
       "value": 55
   },
   {
       "name": "宁夏",
       "value": 3
   },
      {
          "name": "新疆",
          "value": 0
      }
    ];
    var myChart = echarts.init(document.getElementById('chinamap'));
        var option = {
            backgroundColor: '#1b1b1b',
            color: ['gold', 'aqua', 'lime'],
            title: {
                text: '家族模拟迁徙地图',
                //subtext: '数据纯属虚构',
                x: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            legend: {
                orient: 'vertical',
                x: 10,
                data: ['胡氏族谱', '陈氏族谱', '李氏族谱'],
                // selectedMode: 'single',
                //selected: {
                //    '胡氏族谱': false,
                //    '李氏族谱': false
                //},
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: "right",
                y: 'center',
                feature: {
                    mark: { show: true },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series: [
                {
                    name: '地图',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    hoverable: false,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(100,149,237,1)',
                            borderWidth: 0.5,
                            areaStyle: {
                                color: '#1b1b1b'
                            },
                            label: { show: true }//是否显示省份名称
                        }
                    },
                    data: provincedata,
                    tooltip: {
                        trigger: 'item',
                        formatter: '族谱数:{c}'
                    }
                },
                {
                    name: '胡氏族谱',
                    type: 'map',
                    mapType: 'china',
                    data: [],
                    markLine: {
                        smooth: true,
                        effect: {
                            show: true,
                            scaleSize: 1,
                            period: 30,
                            color: '#fff',
                            shadowBlur: 10
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 10
                                }
                            }
                        },
                        data: [
                            [{ name: '淮阳' }, { name: '山西' }],
                            [{ name: '淮阳' }, { name: '新蔡' }],
                            [{ name: '陕西' }, { name: '安徽' }],
                            [{ name: '安徽' }, { name: '福建' }],
                            [{ name: '福建' }, { name: '台湾' }],
                            [{ name: '陕西' }, { name: '甘肃' }],
                            [{ name: '陕西' }, { name: '山西' }],
                            [{ name: '陕西' }, { name: '山东' }],
                            [{ name: '陕西' }, { name: '湖北' }]
                        ]
                    },
                    geoCoord: coordinate
                },
            {
                name: '陈氏族谱',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: [
                        [{ name: '开封' }, { name: '南雄' }],
                        [{ name: '开封' }, { name: '南昌' }],
                        [{ name: '南昌' }, { name: '南雄' }],
                        [{ name: '南雄' }, { name: '广州' }],
                        [{ name: '河南' }, { name: '福建' }],
                        [{ name: '福建' }, { name: '台北' }],
                        [{ name: '山阴县' }, { name: '福建长乐县' }]
                    ]
                }
            },
            {
                name: '李氏族谱',
                type: 'map',
                mapType: 'china',
                data: [],
                markLine: {
                    smooth: true,
                    effect: {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 10
                            }
                        }
                    },
                    data: [
                        [{ name: '鹿邑县' }, { name: '山西' }],
                        [{ name: '鹿邑县' }, { name: '都江堰' }],
                        [{ name: '鹿邑县' }, { name: '河北' }],
                        [{ name: '鹿邑县' }, { name: '陕西' }],
                        [{ name: '安徽涡阳县' }, { name: '陇西' }],
                        [{ name: '安徽涡阳县' }, { name: '邯郸' }],
                        [{ name: '陇西' }, { name: '山东' }],
                        [{ name: '陇西' }, { name: '江西' }],
                        [{ name: '陇西' }, { name: '辽宁' }],
                        [{ name: '陇西' }, { name: '宁夏' }],
                        [{ name: '陇西' }, { name: '江苏' }],
                        [{ name: '陇西' }, { name: '湖南' }],
                        [{ name: '陇西' }, { name: '湖北' }],
                        [{ name: '陇西' }, { name: '云南' }],
                        [{ name: '陇西' }, { name: '福建' }],
                        [{ name: '陇西' }, { name: '广东' }],
                        [{ name: '陇西' }, { name: '广西' }],
                        [{ name: '陇西' }, { name: '贵州' }],
                        [{ name: '陇西' }, { name: '海南' }]
                    ]
                }
            }
            ]
        };
        myChart.setOption(option);
}
function add_tree() {

    var myChart = echarts.init(document.getElementById('worldcloud'), 'macarons');
    var option = {
        title: {
            text: '胡氏家族人物关系图'
        },
        toolbox: {
            show: true,
            feature: {
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '家族',
                type: 'tree',
                orient: 'horizontal',  // vertical horizontal
                 rootLocation: {x: 1,y: '40%'}, // 根节点位置  {x: 100, y: 'center'}
                nodePadding: 50,
                layerPadding: 120,
                symbolSize: 6,//点的大小
                itemStyle: {
                    normal: {
                        color: '#4883b4',//点的颜色
                        label: {
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: '#000',
                                fontSize: 12
                            }
                        },
                        lineStyle: {
                            color: '#ccc',
                            type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                        }
                    }
                },

                data: [
                    { "name": "胡天旭/胡旭", "children": [{ "name": "胡德江/胡瑞杰", "children": [{ "name": "胡锡镛", "children": [{ "name": "胡奎照/胡贞焘" }, { "name": "胡奎熙/胡贞锜", "children": [{ "name": "胡守璐/胡祥祐" }, { "name": "胡玠/胡祥绂" }, { "name": "胡祥糸㔾" }, { "name": "胡玮/胡祥糓" }, { "name": "胡传/胡祥蛟", "children": [{ "name": "胡洪骍/胡适" }, { "name": "胡国琦/胡洪骓" }, { "name": "胡嗣稼/胡洪骏" }] }] }] }] }] }
                ]
            }
        ]
    };
    myChart.setOption(option);
}
