//==UserScript==
//@name        Rule34 Theme
//@namespace   AdventShit
//@version     1.0
//@description Display only image on post page!
//@author      Advent
//@match       *://rule34.us/index.php?r=posts/view&id=*
//@match       *://*.rule34.us/images/*
//@grant       window.close
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Rule34%20Theme.user.js
//==/UserScript==
(()=>{
  'use strict';
  if(window.location.origin.split('://').pop()=='rule34.us'){
    var body=$('body');
    const curIMG=$('>div.container>div.content_push>img',body);
    if(curIMG.length){
      const imgSRC=$('>div.container>div.content_push>img',body).attr('src');
      const img=$('<img>').attr('src',imgSRC);
      $(body).remove();
      $('<body>').insertAfter($('head'));
      body=$('body');
      img.prependTo(body);
      $(document).on('keypress.download',function(e){
        if(e.keyCode===100){
          e.preventDefault();
          const a=$('<a>').attr('href',imgSRC).attr('download','');
          a[0].click();
        }
      });
      $(document).mousedown(function(e){
        if(e.button===1){
          e.preventDefault();
          const a=$('<a>').attr('href',imgSRC).attr('download','');
          a[0].click();
        }
      });
    }else{
      const head=$('head');
      $('>div.container>div.content_push>video',body).appendTo(head);
      $(body).remove();
      $('<body>').insertAfter($('head'));
      body=$('body');
      $('video',head).prependTo(body);
      const video=$('>video',body);
      $(document).on('keypress.download',function(e){
        if(e.keyCode===100){
          e.preventDefault();
          const a=$('<a>').attr('href',$('>source:first-of-type',video).attr('src')).attr('download','');
          a[0].click();
        }
      });
      $(document).mousedown(function(e){
        if(e.button===1){
          e.preventDefault();
          const a=$('<a>').attr('href',$('>source:first-of-type',video).attr('src')).attr('download','');
          a[0].click();
        }
      });
    }
  }else{
    if($('body>img').length){
      const imgSRC=$('body>img').attr('src');
      const a=$('<a>').attr('href',imgSRC).attr('download',imgSRC.split('/').pop());
      a[0].click();
      setTimeout(()=>{window.close()},1);
    }else{
      const videoSRC=$('body>video>source:first-of-type').attr('src');
      const a=$('<a>').attr('href',videoSRC).attr('download',videoSRC.split('/').pop());
      a[0].click();
      setTimeout(()=>{window.close()},1);
    }
  }
})()