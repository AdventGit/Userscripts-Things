//==UserScript==
//@name        MMDArchive Theme
//@namespace   AdventShit
//@version     1.2
//@description A theme for MMDArchive
//@author      Advent
//@match       *://mmda.booru.org/index.ph*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/MMDArchive%20Theme.user.js
//==/UserScript==
(()=>{
  'use strict';
  const uLoc=window.location.href.split('&s=')[1].split('&')[0];
  if(uLoc=='list'){
    setTimeout(()=>{
      const postList=$('body>div#content>div#post-list');
      const contentEle=$('>div.content',postList);
      const spanParent=$('>div>div>span.thumb',contentEle);
      $('>div.sidebar>div.space>form>br',postList).remove();
      $('>div>div>a#pi',contentEle).css('display','none');
      $('>a[style]',spanParent).each(()=>{$(this).css('display','')});
      $('>a',spanParent).each((_,v)=>{
        const onCur=$(v);
        const scalar=1.25;
        const newSizing=150*scalar+'px';
        const onCurImg=$('>img',onCur);
        const newH=onCurImg.height()*scalar;
        const newW=onCurImg.width()*scalar;
        onCur.css('height',newSizing).css('width',newSizing);
        onCurImg.css('height',newH).css('width',newW);
      });
    },200);
  }else if(uLoc=='view'){
    const sideBar=$('body>div#content>div#post-view>div.sidebar');
    const sideBarDescript=$('>div#tag_list>ul',sideBar);
    $('>div.space>form>br',sideBar).remove();
    const linkText=sideBarDescript.text().split('Source:')[1].substring(1).split(' ')[0];
    sideBarDescript.html(sideBarDescript.html().replace('Source: '+linkText,'<a href="'+linkText+'">Source</a>'));
  }
})()