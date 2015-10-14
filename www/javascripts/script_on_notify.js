function toggle(id){
    //console.log($("#"+id))
    $("#"+id+"> div").toggleClass("hidden");
}

function sendMsg (id, sign) {
    var tmp;
    if (sign == 1) tmp= "accepted"; else tmp = "refaused";

    $.get(apiAddress+"arrange/receive/"+id+"/"+tmp, function(result){
        if (result&&sign == 1) {
            if(note){
                note.alert("已应战，双方自行安排比赛", function(){

                }, "消息", "确定");
            }
            else{
                alert("已应战，双方自行安排比赛");
            }
            ctrl.reload();
        }
        else if (sign == 0){
            ctrl.reload();
        }
        else {
            alert_flash("回复失败！");
        }
    })
    .fail(function(){
        alert_flash("回复失败！");
    });
}

function ajaxFight (id, status) {
    status = JSON.parse(status.split("@").join("\""));
    if(status.method == "open"){
        confirmIt("双方确定开打后，记分牌将在双方个人首页显示", "提示", function(){
            $.get(apiAddress + "arrange/match/open/" + userID +"/"+ id +"/"+ status.type, function(result){
                if(result.success){
                    status.method = "cancel";
                    $("#" +id+ " .fightButton .btn").attr("status", JSON.stringify(status).split("\"").join("@"));
                    $("#" +id+ " .fightButton span").text("取消开打");
                    alert_flash("已开打！");
                }
                else{
                    alertIt(result.message, "消息");
                }
            });
        });
    }
    else{
        confirmIt("取消开打后，双方需重新确认开打", "提示", function(){
            $.get(apiAddress + "arrange/match/cancel/" + id, function(result){
                status.method = "open";
                $("#" +id+ " .fightButton .btn").attr("status", JSON.stringify(status).split("\"").join("@"));
                $("#" +id+ " .fightButton span").text("开打");
            })
        })
    }
}

function addBlue (item, img, msg) {
    var content_up = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "blue_up" style="background:rgb(23, 142, 211);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%;"><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:55%;padding-left:3%;padding-right:3%"><span style="color:#F6F6F7;font-weight:normal">'+ msg +'</span></th><th><button class="btn btn-primary" type="button" style="width:90px; border-color:rgb(220, 221, 221);padding: 3px 12px;color:#286090;background-color:rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span>查看</span></button></th></tr></table></div>',
        content_down = '<div class = "blue_down hidden" style="background:rgb(23, 142, 211);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table class="teamInfo"><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%;padding-right:3%"><p style="margin:0 0 5px"><span style="color:#F6F6F7;font-weight:normal">'+msg+'</span></p><p style="margin: 0 0 0px;"><button class="btn btn-primary" type="button" style="width:110px; padding:0px 0px; border-color:rgb(220, 221, 221);height:30px;color:#286090;background-color:rgb(220, 221, 221)"><span>'+item.Phone+'</span></button></p></th><th style="width:10%"></th></tr></table><table><tr><th style="width:27%"></th><th style="width:60%"></th><th><button class="btn btn-primary" type="button" style="width:90px;border-color:rgb(220, 221, 221);padding:3px 12px;color:#286090; background-color: rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span style="font-weight:font-weight:normal">收起</span></button></th></tr></table></div></div>';

    $(".message").append(content_up + content_down);
}


function addPend (item) {
    var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
    var msg;
    if (item.ActiveID == userID) addBlue(item, img, "等待对方应战")
    else{
        msg = item.TeamName+" 向你约战";

        var up = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" fid="'+ item.ActiveID +'"style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "grey_up" style="background:rgb(240, 240, 240);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%;"><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:55%;padding-left:3%;padding-right:3%"><span style=";color:rgb(40, 96, 144);font-weight:normal">'+ msg +'</span></th><th><button class="btn btn-primary" type="button" style="width:90px; border-color:rgb(220, 221, 221);  padding: 3px 12px; color: #286090; background-color: rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span>查看</span></button></th></tr></table></div>';

        var down = '<div class = "grey_down hidden" style="background:rgb(240, 240, 240);;width:100%;margin-left:0; padding:3% 3% 3% 3%"><table ><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%;padding-right:3%"><p style="margin: 0 0 5px;"><span style="color:#286090;font-weight:normal">'+ msg +'</span></p><p style="margin: 0 0 0px;"><button class="btn btn-primary" type="button" style="width:110px; padding:0px 0px; border-color:rgb(220, 221, 221);height:30px;  color: #286090; background-color: rgb(220, 221, 221);"><span>'+ item.Phone +'</span></button></p></th><th style="width:10%"></th></tr></table><table style="width:100%;margin-top:9px"><tr><th style="width:50%;text-align:center"><button class="btn btn-primary" type="button" style="width:90%;border-color: rgb(230, 0, 18);  padding: 3px 12px;color: #286090; background-color: rgb(230, 0, 18);" onclick="sendMsg('+item.ArrangeID+', 0)"><span style="font-weight:font-weight:normal">拒绝</span></button></th><th style="width:50%;text-align:center"><button class="btn btn-primary" type="button" style="width:90%;border-color:rgb(220, 221, 221);padding: 3px 12px;color:#286090;background-color:rgb(220, 221, 221)" onclick="sendMsg('+item.ArrangeID+', 1)"><span style="font-weight:font-weight:normal">接受</span></button></th></tr></table></div>';
        $('.message').append(up+down);
    }
            
}

function addAccepted (item) {
    var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
    var msg;
    var status={
        type:"",
        method:"open"
    };
    var fight='开打';

    if (item.ActiveID == userID){
        msg = item.TeamName + " 接受你的约战";
        status.type = "active";
        if(item.ActiveOpened == 1)  {
            fight = "取消开打";
            status.method = "cancel";
        }
    }
    else {
        msg = "已接受 "+ item.TeamName +" 的约战";
        status.type = "receive";
        if(item.ReceiveOpened == 1)  {
            fight = "取消开打";
            status.method = "cancel";
        }
    }
    addBlue(item, img, msg);
    status = JSON.stringify(status).split("\"").join("@");
    var fightButton = '<table class="fightButton" style="width:100%;margin:10px 0 10px 0"><tr><th style="width:10%"></th><th style="width:80%"><button class="btn btn-primary" type="button" onclick="stopBubble(event);ajaxFight('+item.ArrangeID+',$(this).attr(\'status\'))" status="'+status+'" style="width:100%;padding:0px 0px;border-color:rgb(220, 221, 221);height:30px;color:#286090;background-color:rgb(220,221,221)"><span>'+fight+'</span></button></th><th style="width:10%"></th></tr></table>';
    $(".fightButton").off();
    $("#"+item.ArrangeID+" .teamInfo").after(fightButton);
}

function addDone (item) {
    var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
    var msg = "比赛已结束";
    addBlue(item, img, msg);
}


function addReject (item) {
    var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
    var msg;
    if (item.ActiveID == userID)
        msg = item.TeamName + " 拒绝你的约战";
    else msg = "已拒绝"+ item.TeamName +" 的约战";
            
    var reject = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "row1" style="background:rgb(230, 0, 18);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%"><tr><th style="width:60px"><img class="img-circle circle" src="'+img+'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%"><span style="color:#F6F6F7;font-weight:normal">'+msg+'</span></th></tr></table></div></div>'

    $(".message").append(reject);
}