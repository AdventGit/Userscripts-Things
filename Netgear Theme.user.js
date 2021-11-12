//==UserScript==
//@name        Netgear Theme
//@namespace   AdventShit
//@version     1.0
//@description A theme for Netgear.
//@author      Advent
//@match       *://192.168.*.1/*
//@match       *://routerlogin.net/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Netgear%20Theme.user.js
//==/UserScript==
(()=>{
  'use strict';
  ['body>div#container.container_center','div#circle-info-modal.circle-modal','div#main_screen>table.newtopframe>tbody>tr>td[style="text-align:center;padding-top: 25px;"]','div.pane#basic-pane>table#basic-table>tbody>tr>td[style]>div.basic-menu>div:not([class])','div.pane#adv-pane>table#advance-table>tbody>tr[style]>td[style]>ul.advance-menu>div:not([class])','body>form>div#container>div#middle>div#menu>div.card-nighthawk-app'].forEach(ele=>{try{document.querySelector(ele).remove()}catch(e){}});
  setTimeout(()=>{try{$('body').contents().find('div.download-alert-nighthawk').remove()}catch(){}},1);
})()