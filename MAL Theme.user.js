//==UserScript==
//@name        MAL Theme
//@namespace   AdventShit
//@version     1.0
//@description A theme for MAL.
//@author      Advent
//@match       *://myanimelist.net/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/MAL%20Theme.user.js
//==/UserScript==
var isScrolling=false;
function removeAttrs(ele){['data-src','data-srcset','srcset'].forEach(attr=>{ele.removeAttr(attr)})}
function largeImages(){
  $('div.picSurround>a.hoverinfo_trigger>img:not(.touched)').each((_,v)=>{
    const onCur=$(v);
    const eleSRC=onCur.attr('src');
    if(typeof eleSRC!==typeof undefined&&eleSRC!==false){
      const newLink='https://cdn.myanimelist.net'+eleSRC.split('50x70').pop().split('.')[0]+'.jpg';
      removeAttrs(onCur);
      onCur.attr('src',newLink);
      onCur.addClass('touched');
    }
  })
}
function scrollLoad(){
  $(window).scroll(()=>{
    if(!isScrolling){
      if($('div.picSurround>a.hoverinfo_trigger>img:not(.touched)').length===0){
        $(window).unbind('scroll')
      }else{
        isScrolling=true;
        largeImages();
        setTimeout(()=>{isScrolling=false},500);
      }
    }
  })
}
function init(){
  ['body>script','body>noscript','body div[class*="-ad"]','body div[class*="ad-"]','body div[id*="-ad"]','body div[id*="ad-"]','body>div#myanimelist>script','body>div#myanimelist>div.wrapper>script','body>div#myanimelist>div.wrapper>div#headerSmall>script','body>div#myanimelist>div.wrapper>div#headerSmall>div.banner-header-anime-straming','body>div#myanimelist>div.wrapper>div#headerSmall>div#header-menu>div.header-menu-login>a.btn-mal-service','body>footer>div#footer-block>div.banner-footer-anime-streaming','body>footer>div#footer-block>div.footer-link-icon-block','body>div.root'].forEach(ele=>{$(ele).each((_,v)=>{$(v).remove()})})
  if(window.location.href.includes('anime.php?')){
    scrollLoad();
    setTimeout(()=>{largeImages()},1);
  }
}
(()=>{
  'use strict';
  init();
})();