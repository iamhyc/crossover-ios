//阻止冒泡
function stopBubble (e) {
	if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true;
}

//长按事件
function longFocus (eid, callback) {
	var timer = null;
	$("#"+eid).on({
		mousedown:function(){
			timer = setTimeout(callback, 2000 );
		},
		mouseup:function(){
			clearTimeout( timer );
		}
	})
}



function alert_flash(message, callback){
	var ndiv = "<div id='alert_flash'>" + message + "</div>";
	if (!$('#alert_flash').length) {
		$("body").append(ndiv);
		$("#alert_flash").css("width", message.length*25+"px");
		$("#alert_flash").show(1500);
		setTimeout("$('#alert_flash').fadeOut(500, function(){this.remove()})", 2500);
		}
	if (callback) return callback();
}

function alert_modal (message, callback) {
	
	Eliminate = function () {
			$("#alert_modal").remove();
		}

	var alert_modal = '<div id="alert_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">提示</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:37%"><p style="padding-left:5%;padding-top:7%">'+message+'</p></div><div style="height:22%"><button type="button" class="modal_button" onclick="Eliminate()">确定</button></div></div>';
	
	if (!$('#alert_modal').length) {
		$("body").append(alert_modal);
	}
	if (callback) return callback();
}

function confirm_modal (message, callback) {
	
	setVal = function(val){
		this.Eliminate();
		if (val == 1&&callback) callback();
	}

	Eliminate = function () {
		$("#confirm_modal").remove();
	}

	var confirm_modal = '<div id="confirm_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">提示</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:37%"><p style="padding-left:5%;padding-top:7%">'+message+'</p></div><div class="row" style="margin:0;height:22%"><button type="button" class="modal_button" style="width:50%" onclick="setVal(0)">取消</button><button type="button" class="modal_button" style="width:50%" onclick="setVal(1)">确定</button></div></div>';
	if (!$('#confirm_modal').length) {
		$("body").append(confirm_modal);
	}
	if (callback) return callback();
}


function prompt_modal (message, callback) {
	// Type 0 : Confirming
	getPwd = function(){
		var pwd = $("#prompt_modal .modal_input").val();
		callback(pwd);
		$("#prompt_modal").remove();
	}
	
	var modal0 = '<div id="prompt_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">确认分数</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:47%"><p style="padding-left:5%;padding-top:7%">'+message+'</p><input type ="password" placeholder="输入密码"  autofocus class="modal_input"></input></div><div style="height:22%"><button type="button" class="modal_button" onclick="getPwd()">确定</button></div></div>';
	if (!$('.prompt_modal').length) {
		$("body").append(modal0);
	}
}