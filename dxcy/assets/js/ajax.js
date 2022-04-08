colin = {
    ajax: function (url, data, success, fail, dataType = 'json') {
        jQuery.ajax({
            url: url,
            data: data,
            type: (data === null || data === undefined) ? 'get' : 'post',
            cache: false,
            dataType: dataType,
            success: function (data) {
            	if (typeof (success) === 'function') {
                    success(data)
                }
            },
            error: function (data) {
			layer.msg('正在加载...', {icon: 16,time: 500}, function(){
                if (typeof (fail) === 'function') {
                    fail(data)
                } else {
					layer.msg('网络链接错误', {icon: 2,time: 1000});
                }
            });
                
            }
        })
    },
    postData: function (url, parameter, callback, callerror, ajaxType, ajaxTime) {
        ajaxType = ajaxType || "POST";
        ajaxTime = ajaxTime || 60000;
        $.ajax({
            type: ajaxType,
            url: url,
            async: true,
            dataType: 'html',
            timeout: ajaxTime,
            data: parameter,
            success: function (data) {
                if (callback == null) {
                    $("#ajaxshow").html(data);
                    return false;
                } else {
                    callback(data);
                }
            },
            error: function (error) {
                layer.close();
                if (callerror == null) {
                    layer.msg('网络链接错误', {icon: 2,time: 1000});
                } else {
                    callerror(error);
                }
            }
        });
    },
    msg: function (msg, time = 2) {
        layer.open({
            content: msg
            , skin: 'msg'
            , time: time
        });
    },
    chongzai: function () {
        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover({html: true});
        (function (window, document, $, undefined) {
            $(function () {
                $('[data-scrollable]').each(function () {
                    var element = $(this),
                        defaultHeight = 250;
                    element.slimScroll({
                        height: (element.data('height') || defaultHeight)
                    });
                });
            });
        })(window, document, window.jQuery);
    },
    mode: function (url, bt, se) {
        se ? '' : $("#modal").click();
        var bt = bt || '信息文本';
        var url = url;
        get_url(url, bt);
    },
    gethtml: function (url, paramd, seid, lod, cz) {
        seid = seid || 'bodys';
        colin.ajax(url, null, function (d) {
            $("#" + seid).html(d);
            cz ? colin.chongzai() : '';
            return false
        }, '', '', 'php');
    }
};

/*** 模态窗口调用 ***/
function get_url(url, bt) {
	$("#biaoti").html(bt);
	$("#showInfo").html("<p style='text-align: center;'><i class='fa fa-spin fa-gear'></i></p>");
	colin.postData(
		url, '', function (d) {
			$("#showInfo").html(d);
			colin.chongzai();
			return false
		}, function (d) {
			$("#showInfo").html("<p style='text-align: center;margin:20px auto;'><b>加载失败，请重试</b></p>")
			return false
		}, 'GET'
	);
}
function get_ajax_modal(title,con,time) {
	$("#modal").click();
	$("#title").html(title);
	$("#con").html(con);
	$("#time").html(time);
	colin.chongzai();
	return false;
}