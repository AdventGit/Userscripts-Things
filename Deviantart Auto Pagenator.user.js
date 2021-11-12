//==UserScript==
//@name        Deviantart Auto Pagenator
//@namespace   AdventShit
//@version     1.0
//@description Because backbutton is OP.
//@author      Advent
//@match       *://www.deviantart.com/search/*
//@match       *://deviantart.com/search/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Deviantart%20Auto%20Pagenator.user.js
//==/UserScript==
(()=>{
  'use strict';
  $(window).scroll(()=>{
    if($(window).scrollTop()+$(window).height()>=$('body').height()){
      const nextButton=$('body>div#root>div.hs1JI>div>div._3WsM9>div>div>div._2-0my>div>a._3YB38');
      if(nextButton.length>1){nextButton[1].click()}else{nextButton[0].click()}
    }
  });
})()