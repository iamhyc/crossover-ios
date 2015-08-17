function toggle(id){
            //console.log($("#"+id))
            $("#"+id+"> div").toggleClass("hidden");
        }
        function sendMsg (id, sign) {
            var tmp;
            if (sign == 1) tmp= "accepted"; else tmp = "refaused";
            $.get(apiAddress+"arrange/receive/"+id+"/"+tmp, function(result){
                if (result&&sign == 1) {
                    alert_modal("已应战，双方自行安排比赛", function(){
                        window.location.reload(true);
                    })
                }
                else if (sign == 0){
                    window.location.reload(true);
                }
                else {
                    alert_flash("回复失败！")
                }
            })
        }
        function addBlue (item, img, msg) {
            ''
            var content = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "blue_up" style="background:rgb(23, 142, 211);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%;"><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:55%;padding-left:3%;padding-right:3%"><span style="font-size:0.6em;color:#F6F6F7;font-weight:normal">'+ msg +'</span></th><th><button class="btn btn-primary" type="button" style="width:90px; border-color:rgb(220, 221, 221);  padding: 3px 12px; color: #286090; background-color: rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span>查看</span></button></th></tr></table></div><div class = "blue_down hidden" style="background:rgb(23, 142, 211);;width:100%;margin-left:0; padding:3% 3% 3% 3%"><table ><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%;padding-right:3%"><p style="  margin: 0 0 5px;"><span style="font-size:0.6em;color:#F6F6F7;font-weight:normal">'+msg+'</span></p><p style="margin: 0 0 0px;"><button class="btn btn-primary" type="button" style="width:98px; padding:0px 0px; border-color:rgb(220, 221, 221);height:30px;  color: #286090; background-color: rgb(220, 221, 221);"><span>'+item.Phone+'</span></button></p></th><th style="width:10%"></th></tr></table><table><tr><th style="width:27%"></th><th style="width:60%"></th><th><button class="btn btn-primary" type="button" style="width:90px;border-color:rgb(220, 221, 221);  padding: 3px 12px;color: #286090; background-color: rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span style="font-weight:font-weight:normal">收起</span></button></th></tr></table></div></div>';
            $(".message").append(content);
        }


        function addPend (item) {
            var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
            var msg;
            if (item.ActiveID == userID) addBlue(item, img, "等待对方应战")
            else{
                msg = item.TeamName+" 向你约战";

                var up = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" fid="'+ item.ActiveID +'"style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "grey_up" style="background:rgb(240, 240, 240);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%;"><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:55%;padding-left:3%;padding-right:3%"><span style="font-size:0.6em;color:rgb(40, 96, 144);font-weight:normal">'+ msg +'</span></th><th><button class="btn btn-primary" type="button" style="width:90px; border-color:rgb(220, 221, 221);  padding: 3px 12px; color: #286090; background-color: rgb(220, 221, 221);" onclick="toggle('+item.ArrangeID+');stopBubble(event)"><span>查看</span></button></th></tr></table></div>';

                var down = '<div class = "grey_down hidden" style="background:rgb(240, 240, 240);;width:100%;margin-left:0; padding:3% 3% 3% 3%"><table ><tr><th style="width:60px"><img class="img-circle circle" src="'+ img +'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%;padding-right:3%"><p style="margin: 0 0 5px;"><span style="font-size:0.6em;color:#286090;font-weight:normal">'+ msg +'</span></p><p style="margin: 0 0 0px;"><button class="btn btn-primary" type="button" style="width:98px; padding:0px 0px; border-color:rgb(220, 221, 221);height:30px;  color: #286090; background-color: rgb(220, 221, 221);"><span>'+ item.Phone +'</span></button></p></th><th style="width:10%"></th></tr></table><table style="width:100%;margin-top:9px"><tr><th style="width:50%;text-align:center"><button class="btn btn-primary" type="button" style="width:90%;border-color: rgb(230, 0, 18);  padding: 3px 12px;color: #286090; background-color: rgb(230, 0, 18);" onclick="sendMsg('+item.ArrangeID+', 0)"><span style="font-weight:font-weight:normal">拒绝</span></button></th><th style="width:50%;text-align:center"><button class="btn btn-primary" type="button" style="width:90%;border-color:rgb(220, 221, 221);padding: 3px 12px;color:#286090;background-color:rgb(220, 221, 221)" onclick="sendMsg('+item.ArrangeID+', 1)"><span style="font-weight:font-weight:normal">接受</span></button></th></tr></table></div>';
                $('.message').append(up+down);
            }
            
        }
        function addAccepted (item) {
            var img = imgAddress+ 'TeamLogo/'+ item.TeamLogo;
            var msg;
            if (item.ActiveID == userID)
                msg = item.TeamName + " 接受你的约战";
            else msg = "已接受 "+ item.TeamName +" 的约战";

            addBlue(item, img, msg)
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
            
            var reject = '<div class="'+item.Status+'" id="'+item.ArrangeID+'" style="background:#FFFFFF;width:100%;margin-left:0;padding:1.5% 3% 1.5% 3%"><div class = "row1" style="background:rgb(230, 0, 18);width:100%;margin-left:0;padding:3% 3% 3% 3%"><table style="100%"><tr><th style="width:60px"><img class="img-circle circle" src="'+img+'" style="width:57px;height:57px"></img></th><th style="width:100%;padding-left:3%"><span style="font-size:0.6em;color:#F6F6F7;font-weight:normal">'+msg+'</span></th></tr></table></div></div>'

            $(".message").append(reject);
        }