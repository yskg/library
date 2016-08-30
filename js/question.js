$(document).ready(function () {
    add_pie();

})
function open_pie() {
    $("#bardiv").css("display", "block");

}
function close_pie() {
    $("#bardiv").css("display", "none");

}
function submit() {
    var age = $("[name=age]:checked").val();
    var edu = $("[name=education]:checked").val();
    var pre = $("#prefession").val();
    var infor = "";
    $("[name=infor]:checked").each(function () {
        infor = infor + $(this).val() + " ";

    });
    var sug = $("#suggestion").val();
    if (age == null || edu == null || pre == null || infor == "" ) {
        alert("*代表必填！");
    }
    else {
        $.ajax({
            url: "handler/getJson.ashx",
            data: { method: "question", age: age, edu: edu, pre: pre, infor: infor, sug: sug},
            type: "post",
            dataType: "text",
            success: function (json) {
                alert("提交成功！")
            },
            error: function (mes) {
                alert("提交失败！")
            }

        })
    }
}
function add_pie() {
    var myChart = echarts.init(document.getElementById("piediv"), 'macarons');
    option = {
        //title: {
        //    text: '关注重点统计图',
        //},
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} :{d}%"
        },
        toolbox: {
            show: true,
            y: 10,
            feature: {
                magicType: {
                    show: false,
                    type: ['pie']
                },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: false,
        series: [

            {
                name: '年龄阶段',
                type: 'pie',
                radius: [0, 90],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner'
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: [
                    { value:2, name: '18岁以下' },
                    { value:3, name: '18-30岁' },
                    { value: 5, name: '30-40岁' },
                    { value: 7, name: '40-60岁' },
                    { value:8, name: '60岁以上' }
                ]
            },
            {
                name: '学历',
                type: 'pie',
                radius: [100, 170],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'inner'
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                data: [
                    { value: 1, name: '小学' },
                    { value: 2, name: '初中' },
                    { value: 3, name: '高中' },
                    { value: 4, name: '大专' },
                    { value: 6, name: '本科' },
                    { value: 4, name: '硕士' },
                    { value:7, name: '博士' },
                    { value: 8, name: '博士后' }
                ]
            },
            {
                name: '关注信息',
                type: 'pie',
                radius: [180, 220],
                itemStyle: {
                    normal: {
                        label: {
                            position: 'outer'
                        },
                        labelLine: {
                            show: true,
                            length:10
                        }
                    }
                },
                data: [
                    { value: 2, name: '起源时间' },
                    { value: 3, name: '先祖名人' },
                    { value: 6, name: '奇闻趣事' },
                    { value: 4, name: '发展历程' },

                ]
            }

        ]
    };

    myChart.setOption(option);

}