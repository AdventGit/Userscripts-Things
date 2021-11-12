//==UserScript==
//@name        SubsPlease Auto Show Magnets
//@namespace   AdventShit
//@version     1.0
//@description Auto-Expands Episodes and Removes All Non-1080p Links.
//@author      Advent
//@match       *://subsplease.org/shows/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/SubsPlease%20Auto%20Show%20Magnets.user.js
//==/UserScript==
function deleteLoop(ctx){
  var enableDel=false;
  var onCur=0;
  var loop=-1;
  ctx.each(()=>{
    if(this.text===undefined){
      onCur+=1;
      if(onCur!==3){enableDel=true}else{onCur=0}
    }
    if(enableDel){
      loop+=1;
      if(loop!==8){this.remove()}else{
        loop=-1;
        enableDel=false;
      }
    }
  });
}
(()=>{
  'use strict';
  setTimeout(()=>{
    const baseTarget=$('body>div#page>div#content>div.site-content-inside>div.container>div.row>div#primary>main#main>div#post-wrapper>div.post-wrapper-hentry>article.page>div.post-content-wrapper>div.entry-content>div.series-release>table#show-release-table>tr.new>td.show-release-item');
    const loopTarget=$('>div.download-links',baseTarget);
    $('>label.episode-title',baseTarget).click();
    deleteLoop($('>*',loopTarget));
  },800);
})();