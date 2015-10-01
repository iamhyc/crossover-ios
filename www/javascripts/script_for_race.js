function process(obj) {
    var order = obj.attr("name");
    var selected = "#"+order+".processItem ";

    if (!judgeEqual(selected)){
      alert_flash("分数不能相同，请重新填写");
    }
    else{
        confirmIt("请确认分数，双方队伍提交的分数相同，分数才会生效，反之双方队伍重新上传分数！", "确认分数", function(){
          var data = JSON.stringify({
            "ActiveID":myTodo[order].ActiveID,
            "ReceiveID":myTodo[order].ReceiveID,
            "Score":judgeEqual(selected),
            "ArrangeID":myTodo[order].ArrangeID,
            "ActiveConfirm":1,
            "ReceiveConfirm":1
          });

          if(myTodo[order].ActiveID == myObj.TeamID)
            data.ReceiveConfirm = 0;
          else
            data.ActiveConfirm = 0;

          $.ajax({
            type:'post',
            url: apiAddress+"record",
            contentType: 'application/json',
            dataType:'json',
            data:data,
            success:function(result){
              if (result.success) {
                alert_flash(result.message);
                ctrl.reload();
              }
              else if (!result.success) {
                  alert_flash(result.message);
              }
            }
          });
        });
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
  obj.text((number+1)%10);
}