//==UserScript==
//@name        SubsPlease Auto Darkmode
//@namespace   AdventShit
//@version     1.0
//@description Auto-Toggles Darkmode on SubsPlease.
//@author      Advent
//@match       *://subsplease.org/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/SubsPlease%20Auto%20Darkmode.user.js
//==/UserScript==
(()=>{
  'use strict';
  const toggle=$('div.theme-switch-wrapper>label.theme-switch[for="checkbox"]>input');
  if(!toggle.prop('checked')){toggle.click()}
})();