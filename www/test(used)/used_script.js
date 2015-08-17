function generateReadyList () {
    $(".record > .processItem").remove();
    $(".THead1").attr("src", imgAddress+"TeamLogo/"+myObj.TeamLogo);
    $(".TName1").text(myObj.TeamName);

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

  function generateFinishedList () {
    $(".record").append('<div class="space" style="height:2em"></div>');
    
    for (var i = 0; i < myList.length; i++){
      $(".fakeBox2 .THead2").attr("src", imgAddress+"TeamLogo/"+myList[i].TeamLogo);
      $(".fakeBox2 .scoreItem").attr("fid", i);
      $(".fakeBox2 .scoreItem .THead2").attr("id1", i);
      $(".fakeBox2 .scoreItem .TName2").attr("id1", i);
      $(".fakeBox2 .TName2").text(myList[i].TeamName); 

      var score = myList[i].Score.split(',');
      //console.log(score);
      if (myList[i].ActiveID == myList[i].ActiveTeamID){
        setScore(zeroFill(score[0]), zeroFill(score[1]))
      }
      else {
        setScore(zeroFill(score[1]), zeroFill(score[0]));
      }

      $(".record").append($(".fakeBox2 > .scoreItem").clone());
    }
  }

<div id="moon"></div>

$("#moon").load( "demo2.html", function( response, status, xhr ) {
$('#moon').html(response);
});


document.title = "Crossover";

$(".score").click(
            function(){
                if (!ejected&&!pageShow){
                  $("#block-bg").css("display", "block");
                  $("#against").css("-webkit-transform", "translate(0px, -119%) translateZ(0px)");
                  ejected = !ejected;
                } 
                else {
                  $("#block-bg").css("display", "none");
                  $("#against").css("-webkit-transform", "translate(0px, 0px) translateZ(0px)");
                  ejected = !ejected;
                }
            }
        );

        $("#block-bg").click(function(){
            $("#block-bg").css("display", "none");
            $("#against").css("-webkit-transform", "translate(0px, 0px) translateZ(0px)");
            ejected = !ejected;
        });