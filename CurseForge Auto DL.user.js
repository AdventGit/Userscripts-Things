//==UserScript==
//@name        CurseForge Auto DL
//@namespace   AdventShit
//@version     1.1
//@description Auto-Clicks the Download Button and Closes the Window.
//@author      Advent
//@match       *://www.curseforge.com/minecraft/*/*/download/*
//@grant       window.close
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/CurseForge%20Auto%20DL.user.js
//==/UserScript==
(()=>{
  'use strict';
  setTimeout(()=>{
    $('p[data-countdown-timer].text-xl~p.text-sm a').get(0).click();
    setTimeout(()=>{window.close()},3500);
  },1);
})()