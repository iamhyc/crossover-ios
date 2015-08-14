function deal_spc (content) {
    content=content.replace(/\r\n/g,"<BR>")  
    content=content.replace(/\n/g,"<BR>");  
    return content;
}

function zeroFill (str) {
  while(str.length < 3){
    str = "0" + str;
  }
  return str;
}

function showMsg(usr){
  //console.log(usr);
  $('#black-bg').css("display", 'block');
    $('#name').text(hisPlayer[usr].PlayerName);
    $('#height').text("身高："+hisPlayer[usr].tall);
    $('#weight').text("体重："+hisPlayer[usr].weight);
    $('#site').text("所打位置："+hisPlayer[usr].position);
    $('#intro').html("简介："+deal_spc(hisPlayer[usr].Detail));
    //console.log(hisPlayer[usr].Detail);
    $('#memHead').attr("src", imgAddress+"Teammate/"+hisPlayer[usr].HeadIcon);
  $('.show-block').removeClass("hidden").fadeIn(400);
  //$('body').append(block);
}

function deMsg(){
  $('.show-block').fadeOut(400,function(){
   $(this).addClass("hidden");
   $('#black-bg').css('display', 'none');
  });
}

function generateFinishedList () {
  $(".fakeBox2 .THead1").attr("src", imgAddress+"TeamLogo/"+userShow.TeamLogo);
  $(".fakeBox2 .TName1").text(userShow.TeamName);
    
  for (var i = 0; i < hisList.length; i++){
    $(".fakeBox2 .THead2").attr("src", imgAddress+"TeamLogo/"+hisList[i].TeamLogo);
    $(".fakeBox2 .TName2").text(hisList[i].TeamName); 

    var score = hisList[i].Score.split(',');
    //console.log(score);
    if (hisList[i].ActiveID == hisList[i].ActiveTeamID){
      setScore(zeroFill(score[0]), zeroFill(score[1]))
    }
    else {
      setScore(zeroFill(score[1]), zeroFill(score[0]));
    }

    $(".record").append($(".fakeBox2 > .scoreItem").clone());
  }
}

function setScore(t1, t2) {
  if (parseInt(t1)>parseInt(t2)){
    $(".fakeBox2 .vs").css("background-image", "linear-gradient(90deg,#007979,#007979 50%, #E0E0E0 50%, #E0E0E0)");   
  }
  else{
    $(".fakeBox2 .vs").css("background-image", "linear-gradient(90deg,#E0E0E0,#E0E0E0 50%, #007979 50%, #007979)");
  }

  $(".fakeBox2 .3_t1 span").text(t1[0]);  
  $(".fakeBox2 .2_t1 span").text(t1[1]);  
  $(".fakeBox2 .1_t1 span").text(t1[2]);
  $(".fakeBox2 .3_t2 span").text(t2[0]);  
  $(".fakeBox2 .2_t2 span").text(t2[1]);  
  $(".fakeBox2 .1_t2 span").text(t2[2]);
}

function fightVS () {
  if (myObj.TeamID == userShow.TeamID) {
    alert_flash("怎么可以和自己约战呢");return;
  }
  $.get(apiAddress+"arrange/send/"+myObj.TeamID+"/"+userShow.TeamID, function(result){
      if (result.success) alert_flash("约战成功");
      else {
        //alert_modal(result.message);
        alert(result.message);
      }
  })
}

function stopDefault (event) {
  //event.preventDefault(); 
}

  function touchStart(event) {
      $(".score").css("-webkit-transition", "initial").css("transition", "initial");
      var touch = event.touches[0];
      startX = touch.pageX;
  }
             
  function touchMove(event) {
      var touch = event.touches[0];
      endX = touch.pageX;
      var tmp = 100*(endX - startX)/(clientWidth);
      if ((pageShow == 0)&&(tmp < 0))
        $(".score").css("-webkit-transform", "translate("+ tmp +"%, 0px) translateZ(0px)");
      else if ((pageShow == 1)&&(tmp > 0))
        $(".score").css("-webkit-transform", "translate("+ (tmp-100) +"%, 0px) translateZ(0px)");
  }
             
  function touchEnd(event) {
    //RESTABLE
    $(".score").css("-webkit-transition", "-webkit-transform 300ms ease-out 0s");
    $(".score").css("transition", "-webkit-transform 300ms ease-out 0s")
    if (endX - startX > clientWidth/2.5) {
      $(".score").css("-webkit-transform", "translate(0%, 0px) translateZ(0px)");
      pageShow = 0;
    }
    else if((endX - startX < clientWidth/2.5)&&(endX - startX > 0)){
      $(".score").css("-webkit-transform", "translate(-100%, 0px) translateZ(0px)");
      pageShow = 1;
    }
    else if((endX - startX > -clientWidth/2.5)&&(endX - startX < 0)){
      $(".score").css("-webkit-transform", "translate(0%, 0px) translateZ(0px)");
      pageShow = 0;
    }
    else if(endX - startX < -clientWidth/2.5){
      $(".score").css("-webkit-transform", "translate(-100%, 0px) translateZ(0px)");
      pageShow = 1;
    }
  }