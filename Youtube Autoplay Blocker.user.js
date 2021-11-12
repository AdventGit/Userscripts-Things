//==UserScript==
//@name        Youtube Autoplay Blocker
//@namespace   AdventShit
//@version     0.2.2
//@description Stop Youtube Autoplay.
//@author      joequincy (Advent Edit)
//@match       *://www.youtube.com/watch?*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Youtube%20Autoplay%20Blocker.user.js
//==/UserScript==
function handlePlay(e){
  e.target.removeEventListener('playing',handlePlay);
  e.target.removeEventListener('play',handlePlay);
  e.target.pause();
}
function addListeners(v){
  for(var i=0;i<v.length;i++){
    v[i].removeEventListener('playing',handlePlay);
    v[i].addEventListener('playing',handlePlay);
    v[i].removeEventListener('play',handlePlay);
    v[i].addEventListener('play',handlePlay);
  }
}
(()=>{
  'use strict';
  const videos=document.getElementsByTagName('video');
  const observer=new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.type=='attributes'&&m.target.tagName=='VIDEO'&&m.attributeName=='src'){addListeners(videos)}
      if(m.addedNodes.length>0){for(var i=0;i<m.addedNodes.length;i++){if(m.addedNodes[i].nodeType==1&&m.addedNodes[i].tagName=='VIDEO'){addListeners(videos)}}}
    });
  });
  addListeners(videos);
  observer.observe(document,{attributes:true,childList:true,subtree:true,characterData:false});
})();