function loadPage(num, onward){
	var lstAddress = apiAddress + "team/user/"+ myObj.UserID + "/list/" + num;
	$.get(lstAddress, function(data){
		//console.log(pageNow);
		if (myObj.AdminID!=data.AdminID) Logout();

		if (data.scoreList.length == 0){
			if (onward){
				pageNow++
			}
			else{
				pageNow--;
			}
			alert_flash("没有更多数据了");
		}
		var myList = data.scoreList;
		//console.log(myObj.TeamID);
		localStorage["myList"+num] = JSON.stringify(myList);
		for (var i = 0; i < myList.length; i++){
			var spc = '<div class="spc" style="height:1.5%;width:100%">';
			var col = '<div class="block" style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "row blockr" id='+num+'@'+i+'  style="background:rgb(247, 247, 247);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%;"><tr><th style="width:60px"><img class="img-circle circle" src='+imgAddress+"TeamLogo/"+myList[i].TeamLogo+' style="height:50px;width:50px"></img></th><th style="width:57%;padding-left:2%"><span style="font-size:0.6em;color: rgb(2, 65, 126);font-weight:normal">'+myList[i].TeamName+'</span></th><th style="width:47%"><span class="glyphicon glyphicon-star" style="font-size:23px;color: rgb(2, 65, 126);"></span><span style="font-size:29px;font-style:italic;padding-left:11%;color: rgb(2, 65, 126); font-family: sans-serif;">'+myList[i].lntegral+'</span></th></tr></table></div></div>';

			var spc='<div class="spc" style="height:1.5%;width:100%"></div><div class="block" style="height:15%"><div class="row blockr" id='+num+'@'+i+'  style="height:100%;width:96%;margin-left:2%;margin-right:2%;background-color: whitesmoke;">',
			    col_top='<div class="col-xs-3" style="padding:0;padding-left:3%"><img class="img-circle circle" src='+imgAddress+"TeamLogo/"+myList[i].TeamLogo+' style="margin:18% 0 0 0%;" /></div>',
			    col_mid='<div class="col-xs-4" style="padding:0;padding-top:2%;margin-left:-5%"><p style="margin:16% 0 0 0%;font-size:70%">'+myList[i].TeamName+'</p></div>',
			    col_end='<div class="col-xs-5" style="padding:0;display: -webkit-inline-box;padding-top:6%;padding-left:6%"><span class="glyphicon glyphicon-star" style="margin:26% 0 0 10%;font-size:18px"></span><p style="padding-left:10%;font-style:oblique; padding-top:3%">'+myList[i].lntegral+'</p></div></div>';

			if(!onward){
				$('.homePage').append(col);
			}
			else{
				$('.homePage').prepend(col);
			}
			//$('.homePage').append(spc+col_top+col_mid+col_end);
		}
		$(".blockr").on({
			click:function(){
				var s1 = this.id.indexOf('@');
				var num = this.id.substr(0, s1),
    				order = this.id.substr(s1+1, this.id.length-s1-1)
    			localStorage.userShow = JSON.stringify(JSON.parse(localStorage['myList'+num])[order]);
    			ctrl.move("detail_page.html", true);
    		},
    		touchstart:function(){
    			$(this).css("backgroundColor", "#178ED3");
    		},
    		touchend:function(){
    			$(this).css("backgroundColor", "#F6F7F7");
    		}
		});
	});	
}

function addScrollListener () {
	var at = new appTouch({
        tContain : 'appArea', //必选：滑动区域id
        tMove : 'moveArea', //必选：移动区域id
    }, onmoveend);

    function onmoveend(m) {
    	console.log(m)
        if (m=="top") {
        	ctrl.reload();
        }
        else{
        	pageNow++;
        	loadPage(pageNow);
        }
    }

}
    		

function Logout(){
	localStorage.current_user = "";
	localStorage.lastView = "";
	window.location.href = "index.html";
}