var prevImage=new Array();
var nextImage=new Array();
var isInfoshow = false;

function isWeixinBrowser(){
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}

$(document).ready(function(){

  var winWidth = document.body.clientWidth;
  var winHeight= document.body.clientHeight;
  var img = $("#display img");
  var p = $("p");

  /*Set the size of the display-area*/
  $("#display").height(Math.ceil((winHeight - $("#header").height())*0.90));
  $("#display").width(Math.ceil(winWidth*0.87));
  $("#display").css({
    'margin-right': Math.ceil(winWidth*0.13*0.5) + 'px',
    'margin-top': Math.ceil((winHeight - $("#header").height())*0.10*0.5) + 'px'
  });

  /*Resize the images to adapt to the screen*/
  for (var i = 0; i < img.length; i++) {
    img[i].width = $("#display").width();
    img[i].height = $("#display").height() - 4;
  }

  /*resize the imginfo div and its display style*/
  $("#imginfo").width(Math.ceil(winWidth));
  $("#imginfo").height(Math.ceil(winHeight*0.2));
  $("#imginfo").css('line-height', $("#imginfo").height() + 'px');

  /*Set the z-Index*/
  for(var i=0; i< img.length; i++){
    img[i].style.zIndex= img.length - i;
  }
  for(var i=0; i< p.length; i++){
    p[i].style.zIndex= p.length - i;
  }

  /*Initialize the array--nextImage*/
  for(var i=img.length - 1; i>0;i--){
    nextImage.push(img[i]);
  }
});

/*Slide-Effect using CSS3 animation*/
$(document).on("pageinit","#page",function(){
  $("#display img").on('swipeleft',function(event) {
    if(prevImage.length==$("img").length - 1){
      alert("已经是最后一张了喔");
    } else {
      prevImage.push($(this));

      /*Change the imginfo*/
      var p = $("p");
      var i = $("img").length - $(this).css('z-Index');
      $(p[i]).attr('hidden', 'hidden');

      /*Hide the current image*/
      $(this).css({
        'opacity': '0',
        '-webkit-transform': 'translate(-350px)',
        '-webkit-transition': 'opacity 0.5s, -webkit-transform 0.5s'
      });
    }
  });
});

$(document).on("pageinit","#page",function(){
  $("#display img").on('swiperight',function(event) {
    var previmage=prevImage.pop();
    if(previmage){
      nextImage.push($(this));

      /*Change the imginfo*/
      var p = $("p");
      var i = $("img").length - $(this).css('z-Index') - 1;
      $(p[i]).removeAttr('hidden');

      /*Show the previous image*/
      previmage.css({
        'opacity': '1',
        '-webkit-transform': 'translate(0.01px)',
        '-webkit-transition': 'opacity 0.5s, -webkit-transfrom 0.5s'
      });
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
