function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

var current;
$(document).ready(function() {
  // if (!isWeixinBrowser()) {
  //   document.write("请使用微信浏览器访问");
  // }
  var winWidth = document.body.clientWidth;
  var winHeight = document.body.clientHeight;
  var img = $("img");
  var div = $("#imginfo div");

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
  $("#imginfo").height(Math.ceil(winHeight * 1));
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
});

$(function() {
  FastClick.attach(document.body);
});

function imgAnimate() {
  var img = $("img");
  var div = $("#imginfo div");
  var style = window.getComputedStyle($('.swiper-wrapper').get(0));
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  var count = Math.ceil((-matrix.m41) / document.body.clientWidth);
  var flag = (-matrix.m41) % document.body.clientWidth;

  if (flag != 0) {
    //sth to handle 
  } else {
    if (count > img.length - 1) {
      count = img.length - 1;
    }

    for (var i = 0; i < div.length; i++) {
      if (i == count) {
        $(div[i]).removeAttr('hidden');
      } else {
        $(div[i]).attr('hidden', 'hidden');
      }
    }

    if ($("#imginfo").css('opacity') == 0) {
      $("#imginfo").css({
        'opacity': '0.7',
        '-webkit-transition': 'opacity 0.3s'
      });
      $(img[count]).css({
        'opacity': '0.3',
        '-webkit-transition': 'opacity 0.3s'
      });

    } else {
      $("#imginfo").css({
        'opacity': '0',
        '-webkit-transition': 'opacity 0.3s'
      });
      $(img[count]).css({
        'opacity': '1',
        '-webkit-transition': 'opacity 0.3s'
      });
    }
  }
}

/*Click to show or hide the imginfo*/
$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('click', function(event) {
    imgAnimate();
  });
});

$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('touchstart', function(event) {
    event.preventDefault();
  });
});

$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('touchmove', function(event) {
    event.preventDefault();
    var img = $("img");
    var touch = event.originalEvent.targetTouches[0];

    $("#imginfo").css({
      'opacity': '0',
      '-webkit-transition': 'opacity 0.3s'
    });

    for (i = 0; i < img.length; i++) {
      $(img[i]).css({
        'opacity': '1',
        '-webkit-transition': 'opacity 0.3s'
      });
    }
  });
});