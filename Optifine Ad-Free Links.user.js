//==UserScript==
//@name        Optifine Ad-Free Links
//@namespace   AdventShit
//@version     1.0
//@description Removes the baked in ads to download links.
//@author      Advent
//@match       *://optifine.net/downloads*
//@match       *://www.optifine.net/downloads*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Optifine%20Ad-Free%20Links.user.js
//==/UserScript==
(()=>{
  'use strict';
  $('table.downloadTable>tbody>tr.downloadLine>td.colDownload>a[href]').each(()=>{this.href=this.href.split('&url=').pop().split('&x=')[0]});
})()