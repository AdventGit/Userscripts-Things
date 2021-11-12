//==UserScript==
//@name        Gmail Skip Temporary Error
//@namespace   AdventShit
//@version     1.0
//@description Skips the Temporary Error page.
//@author      Advent
//@match       *://mail.google.com/mail*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Gmail%20Skip%20Temporary%20Error.user.js
//==/UserScript==
(()=>{
  'use strict';
  setTimeout(=>(){if($('title').text()==='Temporary Error'){$('body>table[cellpadding="5"]>tbody>tr>td>p:nth-of-type(2)>font>a[href="https://mail.google.com/mail/u/0"]')[0].click()}},1000);
})()