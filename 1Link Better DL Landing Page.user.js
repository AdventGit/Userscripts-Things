//==UserScript==
//@name        1Link Better DL Landing Page
//@namespace   AdventShit
//@version     1.0
//@description Auto-Switches to the better DL landing page.
//@author      Advent
//@match       *://1link.club/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/1Link%20Better%20DL%20Landing%20Page.user.js
//==/UserScript==
(()=>{
  'use strict';
  const curLoc=window.location.href;
  if(!curLoc.includes('index.php')&&!curLoc.includes('php?id=')){window.location.href='https://1link.club/m1.php?id='+curLoc.split('.club/')[1]}
})()