//==UserScript==
//@name        HorribleSubs Auto Magnet
//@namespace   AdventShit
//@version     1.0
//@description Auto Magnet every 1080p link because lazy.
//@author      Advent
//@match       *://horriblesubs.info/shows/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/HorribleSubs%20Auto%20Magnet.user.js
//==/UserScript==
function showMore(){
  if($('div.episode-container>div.show-more>a').length){
    $('div.episode-container>div.show-more>a')[0].click();
    setTimeout(()=>{showMore()},500);
  }else{getLinks()}
}
function getLinks(){
  var dummy=document.createElement('textarea');
  document.body.appendChild(dummy);
  var links=[];
  $('div.hs-shows>div.rls-info-container').each((_,v)=>{links.push($(v).find('div.rls-links-container>div.rls-link.link-1080p>span.dl-type.hs-magnet-link>a[title="Magnet Link"]').attr('href'))});
  dummy.value=links.join('\n');
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  alert('Copied to clipboard!');
}
function entryPoint(){if($('div.hs-shows>div.rls-info-container>div.rls-links-container>div.rls-link.link-1080p>span.dl-type.hs-magnet-link>a[title="Magnet Link"]').length){showMore()}else{setTimeout(()=>{entryPoint()},500)}}
(()=>{
  'use strict';
  entryPoint();
})();