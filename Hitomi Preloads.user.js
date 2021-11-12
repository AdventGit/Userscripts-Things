//==UserScript==
//@name        Hitomi Preloads
//@namespace   AdventShit
//@version     1.0
//@description Avoids loading bad scripts which do dumb.
//@author      Advent
//@match       *://hitomi.la/*
//@grant       none
//@run-at      document-start
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Hitomi%20Preloads.user.js
//==/UserScript==
'use strict';
const scriptWatcher=new MutationObserver(m=>{
  m.forEach(({addedNodes})=>{
    addedNodes.forEach(n=>{
      if(n.nodeType===1&&n.tagName==='SCRIPT'){
        if(!(['//ltn.hitomi.la/bootstrap/js/bootstrap.min.js','//ltn.hitomi.la/common.js','//ltn.hitomi.la/download.js','//ltn.hitomi.la/FileSaver.min.js','//ltn.hitomi.la/galleries/2054448.js','//ltn.hitomi.la/gallery.js','//ltn.hitomi.la/galleryblock.js','//ltn.hitomi.la/jquery-ui/jquery-ui.min.js','//ltn.hitomi.la/jquery.hotkeys.js','//ltn.hitomi.la/jquery.min.js','//ltn.hitomi.la/js.cookie.js','//ltn.hitomi.la/jszip.min.js','//ltn.hitomi.la/language_support.js','//ltn.hitomi.la/limitlists.js','//ltn.hitomi.la/moveimage.js','//ltn.hitomi.la/pagination.min.js','//ltn.hitomi.la/paging.js','//ltn.hitomi.la/reader.js','//ltn.hitomi.la/results.js','//ltn.hitomi.la/search.js','//ltn.hitomi.la/searchlib.js'].some((v)=>n.src.includes(v)))&&n.src){
          n.type='javascript/blocked';
          n.parentElement.removeChild(n);
        }
      }
    })
  })
});
scriptWatcher.observe(document.documentElement,{childList:true,subtree:true});