/**
 * Created by lucheng0902 on 2017/2/15.
 */
var PageConfig = {
    PageType: {
        index: "index",
        StepOringin: {
            jsConcat: "jsConcat"
        },
        StepOneTemplate: {
            artTemplate: "artTemplate",
            underscore: "underscore"
        },
        StepSecondMVC: {
            backbone: "backbone"
        },
        StepThirdMVVM: {
            react: "react",
            vue: "vue"
        }
    },
    init: function () {
        this.fixIE();
    },
    /**
     * ie8以下console报错问题
     */
    fixIE: function () {
        if (!window.console) {
            window.console = {
                log: function (msg) {

                }
            }
        }
    },
    htmlEncode: function (str) {
        var s = "";
        if (str.length == 0)    return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/    /g, "&nbsp;");
        s = s.replace(/\'/g, "'");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br$amp;>quot;$");
        return s;
    },

    getDefaultJsonData: function () {
        return {
            "status": "OK",
            "list": [
                {
                    "id": "01",
                    "names": "Javascript"
                },
                {
                    "id": "02",
                    "names": "Css"
                },
                {
                    "id": "03",
                    "names": "Html"
                },
                {
                    "id": "04",
                    "names": "Less"
                },
                {
                    "id": "05",
                    "names": "Json"
                }
            ]
        }
    },
    /**
     * 获取测试数据
     * @param cb
     */
    getTestData: function (cb) {
        var _this = this;
        $.ajax({
            url: "data/list.json",
            data: {
                from: "index",
                t: new Date().getTime()
            },
            complete: function (res, status) {
                var jsondata;
                if (status == "success") {
                    jsondata = $.parseJSON(res.responseText);
                }
                else {
                    jsondata = _this.getDefaultJsonData();
                }
                cb && cb(jsondata);
            }
        });
    },
    /**.
     * 获取记录
     * @param msg
     */
    appendRecord: function (msg) {
        var resultMsg = "<li>" + msg + "</li>";
        $("#actionRecord").append(resultMsg);
        console.log(resultMsg);
    },
    //10秒自动刷新页面
    refreshPage: function () {
        setTimeout(function () {
            window.location.reload();
        }, 10000);
    }
};
PageConfig.init();
PageConfig.currentPage = PageConfig.PageType.index;