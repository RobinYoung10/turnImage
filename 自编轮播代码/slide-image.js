$(function() {
  /****************设置轮播图片位置以及大小********************/
  //设置div的高度：刚好能容纳一个图片
  $(".slide-image").css("height", $("#img1").height() + "px");
  //将div的高宽存在变量中
  var slideWidth = $(".slide-image").width();
  var slideHeight = $(".slide-image").height();
  //分别设置每一个图片的位置
  $("#img1").css("left", "0px");
  $("#img2").css({
    "top": -slideHeight + "px",
    "left": slideWidth + "px"
  });
  $("#img3").css({
    "top": -slideHeight*2 + "px",
    "left": slideWidth*2 + "px"
  });
  /********************************************************/
  //下一张图片函数
  function back() {
    $("#img1").animate({left: "-=" + slideWidth + "px"});
    $("#img2").animate({left: "-=" + slideWidth + "px"});
    $("#img3").animate({left: "-=" + slideWidth + "px"});
  }
  //上一张图片函数
  function prev() {
    $("#img1").animate({left: "+=" + slideWidth + "px"});
    $("#img2").animate({left: "+=" + slideWidth + "px"});
    $("#img3").animate({left: "+=" + slideWidth + "px"});
  }
  //从第一张返回最后一张函数
  function goLast() {
    $("#img1").animate({left: "-=" + 2*slideWidth + "px"});
    $("#img2").animate({left: "-=" + 2*slideWidth + "px"});
    $("#img3").animate({left: "-=" + 2*slideWidth + "px"});
  }
  //从最后一张返回第一张函数
  function goFirst() {
    $("#img1").animate({left: "+=" + 2*slideWidth + "px"});
    $("#img2").animate({left: "+=" + 2*slideWidth + "px"});
    $("#img3").animate({left: "+=" + 2*slideWidth + "px"});
  }
  //轮播函数
  function turn(number) {
    if(number == 1 || number == 2)
      back();
    else if(number == 3)
      goFirst();
  }

  var imageNumber = 1;
  function turnStart() {
    //******最重要！清除上一级的click事件防止轮播交叉混乱
    $("#back").off();
    $("#prev").off();
    /*******************/
    //用setInterval实现轮播功能
    var turnInterval = setInterval(function() {
      turn(imageNumber);
      imageNumber++;
      if(imageNumber == 4)
        imageNumber = 1;
    }, 3000);

    //点击按钮下一张图片功能
    $("#back").on("click", function() {
      //清除轮播序列
      clearInterval(turnInterval);
      if(imageNumber == 1 || imageNumber == 2)
        back();
      else if(imageNumber == 3){
        goFirst();
      }
      imageNumber++;
      if(imageNumber == 4)
        imageNumber = 1;
      //递归到轮播实现函数
      turnStart();
    });

    //点击按钮上一张图片功能
    $("#prev").on("click", function() {
      clearInterval(turnInterval);
      if(imageNumber == 2 || imageNumber == 3)
        prev();
      else if(imageNumber == 1){
        goLast();
      }
      imageNumber--;
      if(imageNumber == 0)
        imageNumber = 3;
      turnStart();
    })
  }
  turnStart();
});
