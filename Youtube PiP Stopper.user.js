//==UserScript==
//@name        Youtube PiP Stopper
//@namespace   AdventShit
//@version     1.0
//@description Automatically stop PIP playback.
//@author      Advent
//@match       *://www.youtube.com/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Youtube%20PiP%20Stopper.user.js
//==/UserScript==
(()=>{
  'use strict';
  window.onpopstate=()=>{
    if(!(window.location.href.split('.com/').pop().slice(0,8)==='watch?v=')){
      const PiP=$('ytd-miniplayer');
      if(PiP.length!=0){
        const closeButton=$('button.ytp-miniplayer-close-button',PiP);
        if(closeButton.length!=0){closeButton.click()}
      }
    }
  }
})()