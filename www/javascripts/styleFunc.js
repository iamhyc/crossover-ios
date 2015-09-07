//阻止冒泡
function stopBubble (e) {
	if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true;
}

//长按事件
function longFocus (qObj, callback) {
	var timer = null;
	call = callback;

	qObj.on({
		touchstart:function(){
			qid = $(this).attr("id");
			timer = setTimeout('call(qid)', 500)
		},
		touchend:function(){
			clearTimeout( timer );
		}
	})
}



function alert_flash(message, callback){
	var ndiv = "<div id='alert_flash'>" + message + "</div>";
	if (!$('#alert_flash').length) {
		$("body").append(ndiv);
		$("#alert_flash").css("width", message.length*20+"px");
		$("#alert_flash").show(1500);
		setTimeout("$('#alert_flash').fadeOut(500, function(){this.remove()})", 2500);
		}
	if (callback) return callback();
}

function alert_modal (message, callback) {
	
	Eliminate = function () {
			$("#alert_modal").remove();
			$("#black-bg").css("display", "none");
			if (callback) return callback();
		}

	var alert_modal = '<div id="alert_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">提示</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:37%"><p style="padding-left:5%;padding-top:7%">'+message+'</p></div><div style="height:22%"><button type="button" class="modal_button" onclick="Eliminate()">确定</button></div></div>';
	
	if (!$('#alert_modal').length) {
		$("#black-bg").css("display", "block");
		$("body").append(alert_modal);
	}
	
}

function confirm_modal (message, callback) {
	
	setVal = function(val){
		this.Eliminate();
		if (val == 1&&callback) callback();
	}

	Eliminate = function () {
		$("#confirm_modal").remove();
		$("#black-bg").css("display", "none");
	}

	var confirm_modal = '<div id="confirm_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">提示</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:37%"><p style="padding-left:5%;padding-top:7%">'+message+'</p></div><div class="row" style="margin:0;height:22%"><button type="button" class="modal_button" style="width:50%;padding-top:2%" onclick="setVal(0)">取消</button><button type="button" class="modal_button" style="width:50%;padding-top:2%" onclick="setVal(1)">确定</button></div></div>';

	if (!$('#confirm_modal').length) {
		$("#black-bg").css("display", "block");
		$("body").append(confirm_modal);
	}
}


function prompt_modal (message, callback) {
	// Type 0 : Confirming
	getPwd = function(){
		var pwd = $("#prompt_modal .modal_input").val();
		callback(pwd);
		$("#prompt_modal").remove();
		$("#black-bg").css("display", "none");
	}
	
	var modal0 = '<div id="prompt_modal" class="def_modal"><div style="height:30%"><p style="color:#3CB3B3;font-size:1.6em;padding-left:4%;padding-top:5%">确认分数</p></div><div style="height:1%;background:#3CB3B3"></div><div style="height:47%"><p style="padding-left:5%;padding-top:7%">'+message+'</p><input type ="password" placeholder="输入密码"  autofocus class="modal_input"></input></div><div style="height:22%"><button type="button" class="modal_button" style="padding-top:2%" onclick="getPwd()">确定</button></div></div>';
	if (!$('.prompt_modal').length) {
		$("#black-bg").css("display", "block");
		$("body").append(modal0);
	}
}


/*AJAX HTML LOADING OPTIMIZE*/
var ajaxLoad = function(){
	var load_backface = false;
	var global_url;
	var main = "#body1", back = "#body2";
	//var val = "100%";

	$("#body1").on("webkitAnimationEnd",function(e){
		//console.log(main+" "+back);
		if(e.target == this){
			$(back).removeClass();	$(main).removeClass();
			$(main).css("display", "none").html("");
		}
	});

	this.judgement = function(){
		if (load_backface){
			main = "#body2";
			back = "#body1";
		}
		else{
			main = "#body1";
			back = "#body2";
		}
	}

	this.pageLoad = function(url, callback){
		$.post(url, null, function(data){
			global_url = url;
			callback(data);
		})
	};

	this.preLoad = function(url, callback){
		that = this;
		this.pageLoad(url, function(data){
			that.judgement();

			$(back).html(data);

			if(callback) callback(data);
		})
	}

	this.reload = function(url){
		var re_url = (url)?url:global_url;
		this.judgement();
		this.pageLoad(re_url, function(data){
			$(main).html(data);
		})
	}

	this.switchPage = function(onward){
		$(back).css("display", "block");

		if(onward){
			$(back).addClass("slide-in");
			$(main).addClass("slide-out");
		}
		else{
			$(back).addClass("slide-reverse-in");
			$(main).addClass("slide-reverse-out");
		}

		load_backface = !load_backface;
	};

	this.move = function(url, onward){
		that = this;
		this.preLoad(url, function(data){
			that.switchPage(onward);
		});
	}
}
