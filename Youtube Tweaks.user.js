//==UserScript==
//@name        Youtube Tweaks
//@namespace   http://tampermonkey.net/
//@version     1.0
//@description Makes Youtube refresh URL on every update and removes videos from Home with set minimum values.
//@author      Advent
//@match       *://youtube.com/*
//@match       *://*.youtube.com/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@run-at      document-body
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Youtube%20Tweaks.user.js
//==/UserScript==
'use strict';
/*Set Video Minimum Limits Below*/
const minimumMinutes=1;
const minimumSeconds=29;
/*No Touch Below*/
function videoListDegayer(ele){if(!actualDeleter($('>*:not(.degayed) ytd-thumbnail-overlay-time-status-renderer>span#text',ele))){setTimeout(()=>{videoListDegayer(ele)},250)}}
function actualDeleter(ele){
  if(ele.length!==0){
    ele.each((_,v)=>{
      const onCur=$(v);
      const parentTarget=onCur.parent().parent().parent().parent().parent().parent().parent().parent();
      var videoLength=onCur.text().split(':');
      videoLength.forEach((v,i,a)=>{a[i]=parseInt(v.replace('\n','').replace(/ /g,''),10)});
      if(videoLength.length===2){if(videoLength[0]<minimumMinutes){parentTarget.addClass('nuke')}else if(videoLength[1]<=minimumSeconds){parentTarget.addClass('nuke')}}
      if(parentTarget.length!==0){parentTarget.addClass('degayed')}
    });
    return true;
  }else{return false}
}
document.head.innerHTML+=`<style id="Youtube-Degayer">.nuke,ytd-thumbnail-overlay-loading-preview-renderer{display:none!important}ytd-thumbnail[now-playing] ytd-thumbnail-overlay-time-status-renderer.ytd-thumbnail,ytd-thumbnail[is-preview-loading] ytd-thumbnail-overlay-time-status-renderer.ytd-thumbnail,ytd-thumbnail[is-preview-loading] ytd-thumbnail-overlay-toggle-button-renderer.ytd-thumbnail,ytd-thumbnail[is-preview-loading] ytd-thumbnail-overlay-endorsement-renderer.ytd-thumbnail,ytd-thumbnail[is-preview-loading] ytd-thumbnail-overlay-button-renderer.ytd-thumbnail,ytd-thumbnail[is-preview-loading] ytd-thumbnail-overlay-hover-text-renderer.ytd-thumbnail{display:unset!important}</style>`;
const curHREF=document.location.href;
const windowChangeObserver=new MutationObserver((ms)=>{ms.forEach(()=>{if(curHREF!=document.location.href){window.location.href=document.location.href}})});
windowChangeObserver.observe(document.querySelector('body'),{childList:true,subtree:true});
window.addEventListener('DOMContentLoaded',()=>{
  const windowLoc=curHREF.split('/').pop();
  if(windowLoc===''||windowLoc===' '||windowLoc===null||windowLoc===undefined){
    const body=$('body');
    const ytdApp=$('>ytd-app',body);
    const divContent=$('>div#content',ytdApp);
    const ytdPageManager=$('>ytd-page-manager#page-manager',divContent);
    const ytdBrowse=$('>ytd-browse',ytdPageManager);
    const ytdColumnBrowse=$('>.ytd-browse',ytdBrowse);
    const divPrimary=$('>div#primary',ytdColumnBrowse);
    const ytdRichGridRenderer=$('>ytd-rich-grid-renderer',divPrimary);
    const divContents=$('>div#contents',ytdRichGridRenderer);
    const divPreview=$('>div#preview',ytdRichGridRenderer).remove();
    const ytVideoListObserver=new MutationObserver(()=>{videoListDegayer(divContents)});
    ytVideoListObserver.observe(divContents[0],{childList:true,subtree:false});
  }else if(windowLoc==='subscriptions'){
    console.log('Subs');
  }else if(windowLoc==='library'){
    console.log('Library');
  }else if(windowLoc==='history'){
    console.log('History');
  }else if(windowLoc.split('?')[0]==='watch'){
    console.log('Video');
  }else{console.log(windowLoc)}
});