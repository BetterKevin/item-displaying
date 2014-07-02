function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

/*=============================
  Initialize the size and style
  =============================*/
$(document).ready(function() {
  // if (!isWeixinBrowser()) {
  //   document.write("请使用微信浏览器访问");
  // }
  var winWidth = document.body.clientWidth;
  var winHeight = document.body.clientHeight;
  var img = $("img");
  var div = $("#imginfo div");

  /*================================
    Set the size of the display-area
    ================================*/
  $(".swiper-wrapper").height(winHeight);
  $(".swiper-wrapper").width(img.length * winWidth);

  /*========================================
    Resize the images to adapt to the screen
    ========================================*/
  for (var i = 0; i < img.length; i++) {
    img[i].width = winWidth;
    img[i].height = $(".swiper-wrapper").height();
  }

  /*============================================
    Resize the imginfo div and its display style
    ============================================*/
  $("#imginfo").width(winWidth);
  $("#imginfo").height(winHeight*0.4);

  $("#imginfo").css({
  	'bottom': $(".swiper-container").height() * 0.055 + 'px'
  });
});

/*=========================================
  While click, show or hide the description
  =========================================*/
$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('click', function(event) {
    imgAnimate();
  });
});

$(document).on("pageinit", "#page", function() {
  $("#imginfo").on('click', function(event) {
    imgAnimate();
  });
});

/*=====================================
  While touchmove, hide the description
  =====================================*/
$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('touchmove', function(event) {
    event.preventDefault();
    var img = $("img");
    var touch = event.originalEvent.targetTouches[0];

    $("#imginfo").css({
      'opacity': '0',
      '-webkit-transition': 'opacity 0.3s'
    });
    setTimeout("hide()", 310);
  });
});

$(document).on("pageinit", "#page", function() {
  $("#imginfo").on('touchmove', function(event) {
    event.preventDefault();
    var img = $("img");
    var touch = event.originalEvent.targetTouches[0];

    $("#imginfo").css({
      'opacity': '0',
      '-webkit-transition': 'opacity 0.3s'
    });
    setTimeout("hide()", 310);
  });
});

/*========================
  The subfunctions to work
  ========================*/
$(function() {
  FastClick.attach(document.body);
});

function hide() {
  $("#imginfo").css({
    'display': 'none'
  });
}

function show() {
  $("#imginfo").css({
    'display': 'block'
  });
}

function display() {
  $("#imginfo").css({
    'opacity': '0.6',
    '-webkit-transition': '0.6s opacity'
  });
}

function imgAnimate() {
  var img = $("img");
  var div = $("#imginfo div");
  var style = window.getComputedStyle($('.swiper-wrapper').get(0));
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  var count = Math.ceil((-matrix.m41) / document.body.clientWidth);
  var flag = (-matrix.m41) % document.body.clientWidth;

  if (flag != 0) {
    $(".swiper-wrapper").css({
      '-webkit-transform': $('.swiper-wrapper').css('-webkit-transform')
    });
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
      show();
      setTimeout("display()", 10);
    } else {
      $("#imginfo").css({
        'opacity': '0',
        '-webkit-transition': '0.6s opacity'
      });
      setTimeout("hide()", 610);
    }
  }
}

$(document).on("pageinit", "#page", function() {
  $(".swiper-wrapper").on('touchstart', function(event) {
    event.preventDefault();
  });
});
