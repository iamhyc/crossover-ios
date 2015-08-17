/*
  The code here share the same function both in personal.html & detail_page.html
  No modoules includes.
*/
var apiAddress = "http://120.24.223.82:8080/Crossover/Api/";
var imgAddress = "http://120.24.223.82:8080/Crossover/images/";

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

function showMsg(usr ,players){
  //console.log(usr);
  $('#black-bg').css("display", 'block');
    $('#name').text(players[usr].playersName);
    $('#height').text("身高："+players[usr].tall);
    $('#weight').text("体重："+players[usr].weight);
    $('#site').text("所打位置："+players[usr].position);
    $('#intro').html("简介："+deal_spc(players[usr].Detail));
    //console.log(players[usr].Detail);
    $('#memHead').attr("src", imgAddress+"Teammate/"+players[usr].HeadIcon);
  $('.show-block').removeClass("hidden").fadeIn(400);
  //$('body').append(block);
}

function deMsg(){
  $('.show-block').fadeOut(400,function(){
   $(this).addClass("hidden");
   $('#black-bg').css('display', 'none');
  });
}

function generateReadyList () {
    $(".record > .processItem").remove();

      for (var i = myTodo.length-1; i >= 0; i--){
        //var block="<div id="+myTodo.ArrangeID+"></div>"
        $(".fakeBox1 .THead2").attr("src", imgAddress+"TeamLogo/"+myTodo[i].TeamLogo);
        $(".fakeBox1 .TName2").text(myTodo[i].TeamName);
        stateMap[i] = 0;  
        $(".fakeBox1 .processItem").attr("id", i);
        $(".fakeBox1 .processItem .THead2").attr("id0", i);
        $(".fakeBox1 .processItem .TName2").attr("id0", i);
        $(".fakeBox1 .processBtn").attr("name", i);

        $(".fakeBox1 .3_t1 > span").attr("ArrID", i);
        $(".fakeBox1 .2_t1 > span").attr("ArrID", i);
        $(".fakeBox1 .1_t1 > span").attr("ArrID", i);
        $(".fakeBox1 .3_t2 > span").attr("ArrID", i);
        $(".fakeBox1 .2_t2 > span").attr("ArrID", i);
        $(".fakeBox1 .1_t2 > span").attr("ArrID", i);

        $(".record").prepend($(".fakeBox1 > .processItem").clone());
      }
}

function generateFinishedList (List) {
    
  for (var i = 0; i < List.length; i++){
    $(".fakeBox2 .THead2").attr("src", imgAddress+"TeamLogo/"+List[i].TeamLogo);
    $(".fakeBox2 .scoreItem").attr("fid", i);
    $(".fakeBox2 .scoreItem .THead2").attr("id1", i);
    $(".fakeBox2 .scoreItem .TName2").attr("id1", i);
    $(".fakeBox2 .TName2").text(List[i].TeamName); 

    var score = List[i].Score.split(',');
    //console.log(score);
    if (List[i].ActiveID == List[i].ActiveTeamID){
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


//personal.html
function addMem(){
  window.location.href = "member_add.html";
}
  function turnToPhotos () {
    localStorage.galleryShow = "1_"+myObj.TeamID;
    window.location.href = 'photos.html';
  }

  function turnToDetail (id0, id1) {
    var TeamID;
    if (id0) TeamID = myTodo[id0].TeamID;
    if (id1) TeamID = myList[id1].TeamID;
    var userShow = {
          "UserID":myObj.UserID,
          "TeamID":TeamID
        };
    localStorage.userShow = JSON.stringify(userShow);
    //console.log(localStorage.userShow);
    window.location.href = "detail_page.html";
  }

  function touchStart(event) {
      $(".score-bar").css("-webkit-transition", "initial").css("transition", "initial");
      var touch = event.touches[0];
      startX = touch.pageX;
  }
             
  function touchMove(event) {
      var touch = event.touches[0];
      endX = touch.pageX;
      var tmp = 100*(endX - startX)/(clientWidth);
      if ((pageShow == 0)&&(tmp < 0))
        $(".score-bar").css("-webkit-transform", "translate("+ tmp +"%, 0px) translateZ(0px)");
      else if ((pageShow == 1)&&(tmp > 0))
        $(".score-bar").css("-webkit-transform", "translate("+ (tmp-100) +"%, 0px) translateZ(0px)");
  }
             
  function touchEnd(event) {
    //RESTABLE
    $(".score-bar").css("-webkit-transition", "-webkit-transform 300ms ease-out 0s");
    $(".score-bar").css("transition", "-webkit-transform 300ms ease-out 0s")
    if (endX - startX > clientWidth/2.5) {
      $(".score-bar").css("-webkit-transform", "translate(0%, 0px) translateZ(0px)");
      pageShow = 0;
    }
    else if((endX - startX < clientWidth/2.5)&&(endX - startX > 0)){
      $(".score-bar").css("-webkit-transform", "translate(-100%, 0px) translateZ(0px)");
      pageShow = 1;
    }
    else if((endX - startX > -clientWidth/2.5)&&(endX - startX < 0)){
      $(".score-bar").css("-webkit-transform", "translate(0%, 0px) translateZ(0px)");
      pageShow = 0;
    }
    else if(endX - startX < -clientWidth/2.5){
      $(".score-bar").css("-webkit-transform", "translate(-100%, 0px) translateZ(0px)");
      pageShow = 1;
    }
  }