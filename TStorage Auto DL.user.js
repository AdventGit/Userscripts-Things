//==UserScript==
//@name        TStorage Auto DL
//@namespace   AdventShit
//@version     1.0
//@description Automatically download files.
//@author      Advent
//@match       *://tstorage.info/*
//@grant       window.close
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/TStorage%20Auto%20DL.user.js
//==/UserScript==
(()=>{
  'use strict';
  if(window.location.href.split('tstorage.info/').pop().split('/').length===1){
    new MutationObserver((e)=>{
      setTimeout(()=>{
        e[0].target.click();
        setTimeout(()=>{window.close()},5000);
      },100);
    }).observe($('body>div.wrapper>div#container>div#content>div#container>form>div.rightcol>button#downloadbtn')[0],{attributes:true,childList:true,subtree:true});
  }
})()