var prevImage = new Array();
var nextImage = new Array();
var isInfoshow = false;
var distance;
var count = 0;

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

$(document).ready(function() {
  if (!isWeixinBrowser()) {
    document.write("请使用微信浏览器访问");
  }
  var winWidth = document.body.clientWidth;
  var winHeight= document.body.clientHeight;
  var img = $("#display img");
  var div = $("#imginfo div");

  /*Set the size of the display-area*/
  $("#display").height(Math.ceil((winHeight - $("#header").height())*0.91));
  $("#display").width(img.length*winWidth);
  $("#display").css({
    'margin-top': Math.ceil((winHeight - $("#header").height())*0.09*0.5) + 'px'
  });

  /*Resize the images to adapt to the screen*/
  for (var i = 0; i < img.length; i++) {
    img[i].width = winWidth - 4;
    img[i].height = $("#display").height() - 4;
  }

  /*resize the imginfo div and its display style*/
  $("#imginfo").width(Math.ceil(winWidth));
  $("#imginfo").height(Math.ceil(winHeight*0.15));
  $(".title").width($("#imginfo").width()/2);
  $(".title").height($("#imginfo").height()/3);
  $(".price").width($("#imginfo").width()/2);
  $(".price").height($("#imginfo").height()/3);
  $(".desc").width($("#imginfo").width());
  $(".desc").height($("#imginfo").height());
  $("title").css('line-height', $(".title").height() + 'px');
  $("price").css('line-height', $(".price").height() + 'px');

  /*Set the z-Index*/
  for(var i=0; i<img.length; i++){
    img[i].style.zIndex= img.length - i;
  }
  for(var i=0; i<div.length; i++){
    div[i].style.zIndex= div.length - i;
  }

  /*Initialize the nextImage*/
  for(var i=img.length - 1; i>0; i--){
    nextImage.push(img[i]);
  }

  img.css({
    '-webkit-transform': 'scale(0.3, 0.3)'
  });
  $(img[0]).css({
    '-webkit-transform': 'scale(0.8, 1.0)'
  });

  distance = winWidth;
});

/*Slide-Effect using CSS3 animation*/
$(document).on("pageinit","#page",function(){
  $("#display img").on('swipeleft',function(event) {
    if(count == $("img").length - 1){
      alert("已经是最后一张了喔");
    } else {
      /*Picture animation*/
      prevImage.push($(this));
      var nextimg = $(nextImage.pop());
      $(this).css({
        '-webkit-transform': 'scale(0.3, 0.3)',
        '-webkit-transition': '-webkit-transform 400ms'
      });
      nextimg.css({
        '-webkit-transform': 'scale(0.8, 1.0)',
        '-webkit-transition': '-webkit-transform 400ms'
      });


      /*Move the slider*/
      ++count;
      var tmpdistance = distance*count;
      $("#display").css({       
        '-webkit-transform': 'translate(' + (-tmpdistance) + 'px' + ')',
        '-webkit-transition': '-webkit-transform 400ms'
      });

      // if (isInfoshow==true) {
      //   $("#imginfo").css({
      //     'opacity': '0',
      //     '-webkit-transition': 'opacity 0.3s'
      //   });
      //   isInfoshow = false;
      // } 

      /*Change the imginfo*/
      var div = $("#imginfo div");
      $(div[count - 1]).attr('hidden', 'hidden');
    }
  });
});

$(document).on("pageinit","#page",function(){
  $("#display img").on('swiperight',function(event) {
    if(count != 0){
      /*Picture animation*/
      nextImage.push($(this));
      var previmg = $(prevImage.pop());
      $(this).css({
        '-webkit-transform': 'scale(0.3, 0.3)',
        '-webkit-transition': '-webkit-transform 400ms'
      });
      previmg.css({
        '-webkit-transform': 'scale(0.8, 1.0)',
        '-webkit-transition': '-webkit-transform 400ms'
      });

      /*Move the slider*/
      --count;
      var tmpdistance = distance*count;
      $("#display").css({
        '-webkit-transform': 'translate(' + (-tmpdistance) + 'px' + ')',
        '-webkit-transition': '-webkit-transform 400ms'
      });

      // if (isInfoshow==true) {
      //   $("#imginfo").css({
      //     'opacity': '0',
      //     '-webkit-transition': 'opacity 0.3s'
      //   });
      //   isInfoshow = false;
      // } 

      /*Change the imginfo*/
      var div = $("#imginfo div");
      $(div[count]).removeAttr('hidden');
    } else {
      alert("已经是第一张了喔");
    }
  });
});

/*Click to show or hide the imginfo*/
$(document).on("pageinit","#page",function(){
  $("#display img").on('click',function(event) {
    if($("#imginfo").css('opacity')==0){
      $("#imginfo").css({
        'opacity': '0.6',
        '-webkit-transition': 'opacity 0.3s'
      });
      isInfoshow = true;
    } else {
      $("#imginfo").css({
        'opacity': '0',
        '-webkit-transition': 'opacity 0.3s'
      });
      isInfoshow = false;
    }
  });
});