var prevTime;
var currTime;
var prevDist;
var currDist;
var Speed;

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

$(document).ready(function() {
  if (!isWeixinBrowser()) {
    document.write("请使用微信浏览器访问");
  }
  var winWidth = document.body.clientWidth;
  var winHeight = document.body.clientHeight;
  var img = $("img");
  var div = $("#imginfo div");
  prevTime = 0;
  currTime = 0;
  prevDist = 0;
  currDist = 0;

  /*Set the size of the display-area*/
  $(".swiper-wrapper").height(Math.ceil((winHeight - $("#header").height()) * 0.90));
  $(".swiper-wrapper").width(img.length * winWidth);
  $("#imginfo").width(img.length * winWidth);
  $(".swiper-wrapper").css({
    'margin-top': Math.ceil((winHeight - $("#header").height()) * 0.09 * 0.5) + 'px'
  });

  /*Resize the images to adapt to the screen*/
  for (var i = 0; i < img.length; i++) {
    img[i].width = winWidth - 4;
    img[i].height = $(".swiper-wrapper").height() - 4;
  }

  /*resize the imginfo div and its display style*/
  $("#imginfo").width(Math.ceil(winWidth));
  $("#imginfo").height(Math.ceil(winHeight * 0.2));
  $(".title").height($("#imginfo").height() / 2);
  $(".title").width($("#imginfo").width() / 2);
  $(".price").height($("#imginfo").height() / 2);
  $(".price").width($("#imginfo").width() / 2);
  $(".desc").height($("#imginfo").height());
  $(".desc").width($("#imginfo").width());
  $(".title").css('line-height', $(".title").height() + 'px');
  $(".price").css('line-height', $(".price").height() + 'px');

  /*Set the z-Index*/
  for (var i = 0; i < img.length; i++) {
    img[i].style.zIndex = img.length - i;
  }
  for (var i = 0; i < div.length; i++) {
    div[i].style.zIndex = div.length - i;
    $(div[i]).attr('hidden', 'hidden');
  }

  img.css({
    '-webkit-transform': 'scale(0.90, 0.98)'
  });
});

/*Click to show or hide the imginfo*/
$(document).on("pageinit", "#page",function() {
  $(".swiper-wrapper img").on('click',
  function(event) {
    var div = $("#imginfo div");
    var style = window.getComputedStyle($('.swiper-wrapper').get(0));
    var matrix = new WebKitCSSMatrix(style.webkitTransform);
    var count = ( - matrix.m41) / document.body.clientWidth;

    for (var i = 0; i < div.length; i++) {
      if (i == count) {
        $(div[i]).removeAttr('hidden');
      } else {
        $(div[i]).attr('hidden', 'hidden');
      }
    }

    if ($("#imginfo").css('opacity') == 0) {
      $("#imginfo").css({
        'opacity': '0.6',
        '-webkit-transition': 'opacity 0.3s'
      });

    } else {
      $("#imginfo").css({
        'opacity': '0',
        '-webkit-transition': 'opacity 0.3s'
      });
    }
  });
});

$(document).on("pageinit", "#page",function() {
  $(".swiper-wrapper img").on('touchmove',function(event) {
    event.preventDefault();
    var touch = event.originalEvent.targetTouches[0];

    $("#imginfo").css({
      'opacity': '0',
      '-webkit-transition': 'opacity 0.3s'
    });

    prevTime = currTime;
    prevDist = currDist;
    currTime = new Date().getTime();
    currDist = touch.clientX;
  });
});

/*$(document).on("pageinit", "#page",function() {
  $(".swiper-wrapper img").on('touchend',function(event) {
    Speed = getCurrentSpeed();
    doSlide();
    prevTime = 0;
    prevDist = 0;
    currTime = 0;
    currDist = 0;
  });
});*/
/*
function getCurrentSpeed(){
  var deltaDist = Math.abs(currDist - prevDist);
  var deltaTime = currTime - prevTime;
  if(deltaDist == 0){
    return 0;
  } else {
    return (deltaDist/deltaTime*1000);
  } 
}

function doSlide(){
  var style = window.getComputedStyle($('.swiper-wrapper').get(0));
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  var distance = Speed / 10;

  if(currDist < prevDist){
    distance = -distance;
  }
  var movement = matrix.m41 + distance;

  console.log(movement);
  $(".swiper-wrapper").css({
    '-webkit-transform': 'translate3d('+ movement +'px, 0px, 0px)',
    '-webkit-transition': '-webkit-transform 0.5s'
  });
}*/