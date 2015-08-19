function process(obj) {
    var order = obj.attr("name");
    var selected = "#"+order+".processItem ";
    stateMap[order]++;  //console.log(stateMap[order]);
    switch(stateMap[order]){
      case 1:
        $(selected+".processBtn > span").text("确定");
        $(selected + ".vs").css("background-image", "linear-gradient(90deg,#DCDDDD,#DCDDDD 50%, #C9CACA 50%, #C9CACA)");
        $(selected + ".devider").css("background-image", "linear-gradient(90deg,#DCDDDD,#DCDDDD 50%, #C9CACA 50%, #C9CACA)");
        $(selected+" .Info2").removeClass("hidden");
        break;
      case 2:
        $(selected + ".vs").css("background-image", "linear-gradient(90deg,#C9CACA,#C9CACA 50%, #DCDDDD 50%, #DCDDDD)");
        $(selected + ".devider").css("background-image", "linear-gradient(90deg,#C9CACA,#C9CACA 50%, #DCDDDD 50%, #DCDDDD)");
        $(selected+".Info2").addClass("hidden");
        $(selected+".Info1").removeClass("hidden");
        break;
      case 3:
        if (judgeEqual(selected)){
          $(selected + ".vs").css("background-image", "");
          $(selected + ".devider").css("background-image", "");
          $(selected+".Info1").addClass("hidden");
          $(selected+".processBtn > span").text("提交分数");
          break;
        }
        else{
          alert_flash("分数不能相同，请重新填写");
          stateMap[order]--;
          break;
        }
      case 4:
          var msg = myTodo[order].TeamName+"战队输入管理员密码";
          var pwd = prompt(msg);
          if (!pwd) {
                alert_flash("请输入密码");
                stateMap[order]--;
              }
              else{
                pwd = $.base64.btoa(des("isalways", pwd, 1, 0, "", 1));
                var data = JSON.stringify({
                    "VerifyID":myTodo[order].TeamID,
                    "Password":pwd,
                    "ActiveID":myTodo[order].ActiveID,
                    "ReceiveID":myTodo[order].ReceiveID,
                    "Score":judgeEqual(selected),
                    "ArrangeID":myTodo[order].ArrangeID
                });
                //console.log(data);
                $.ajax({
                  type:'post',
                  url: apiAddress+"record",
                  contentType: 'application/json',
                  dataType:'json',
                  data:data,
                  success: 
                      function(result){
                        if (result.success) {
                          alert_flash("上传比分成功");
                           ctrl.reload();
                        }
                        else if (!result.success) {
                          alert_flash("输入的密码错误");
                          stateMap[order]--;
                        }
                      }
                })
              };
          /*prompt_modal(msg, function(pwd){
              if (!pwd) {
                alert_flash("请输入密码");
                stateMap[order]--;
              }
              else{
                pwd = $.base64.btoa(des("isalways", pwd, 1, 0, "", 1));
                var data = JSON.stringify({
                    "VerifyID":myTodo[order].TeamID,
                    "Password":pwd,
                    "ActiveID":myTodo[order].ActiveID,
                    "ReceiveID":myTodo[order].ReceiveID,
                    "Score":judgeEqual(selected),
                    "ArrangeID":myTodo[order].ArrangeID
                });
                //console.log(data);
                $.ajax({
                  type:'post',
                  url: apiAddress+"record",
                  contentType: 'application/json',
                  dataType:'json',
                  data:data,
                  success: 
                      function(result){
                        if (result.success) {
                          alert_flash("上传比分成功");
                           window.location.reload(true);
                        }
                        else if (!result.success) {
                          alert_flash("输入的密码错误");
                          stateMap[order]--;
                        }
                      }
                })
              }
          });*/
        break;
      default:
         stateMap[order]--;
         break;
    }
  }

  function judgeEqual (item) {
    var score1 = getTeam(item, 1);
    var score2 = getTeam(item, 2);
    if (score1==score2) return false;
    else return(score1+","+score2);
  }

  function getTeam (item, order) {
    var sub = " span";
    return $(item+" .3_t"+order+sub).text()+$(item+" .2_t"+order+sub).text()+$(item+" .1_t"+order+sub).text();
  }

  function dynamic(obj){
    var state = stateMap[obj.attr("ArrID")],
        teamid = obj.attr("TeamID");
    var number = parseInt(obj.text());
    if ((state=="1"&&teamid=="2")||(state=="2"&&teamid=="1"))
    obj.text((number+1)%10);
   }