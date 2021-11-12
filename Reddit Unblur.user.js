//==UserScript==
//@name        Reddit Unblur
//@namespace   AdventShit
//@version     1.0
//@description Unblur images on Reddit.
//@author      Advent
//@match       *://*.reddit.com/r*
//@match       *://reddit.com/r*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Reddit%20Unblur.user.js
//==/UserScript==
const linkContent='preview.redd.it';
const newContent='https://i.redd.it/';
var isScrolling=false;
function updateImages(){
  $('img[src]:not(.updatedImage)').each(()=>{
    let onCur=$(this).attr('src');
    if(!onCur.includes('external-'+linkContent)&&onCur.includes(linkContent)){
      $(this).attr('src',newContent+onCur.split(linkContent+'/').pop().split('?')[0]);
      $(this).addClass('updatedImage');
    }
  })
}
(()=>{
  'use strict';
  $(window).scroll(()=>{
    if(!isScrolling){
      isScrolling=true;
      updateImages();
      setTimeout(()=>{isScrolling=false},500);
    }
  });
})();