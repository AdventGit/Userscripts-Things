//==UserScript==
//@name        Hitomi Theme (Mobile)
//@namespace   AdventShit
//@version     1.1
//@description A theme for Hitomi.
//@author      Advent
//@match       *://hitomi.la/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Hitomi%20Theme%20(Mobile).user.js
//==/UserScript==
(()=>{
  'use strict';
  const toDelEvents=['touchstart','touchmove','touchend'];
  toDelEvents.forEach(tde=>{document.addEventListener(tde,(e)=>{e.stopImmediatePropagation()})});
  document.head.innerHTML+=`<style id="Advent-CSS">:root{
  --bg-color:rgb(40,40,40);
  --color:rgb(184,184,184);
  --ts-color:rgb(40,40,40);
  --user-color:#33B5E5;
  --custom-width:200px;
  --custom-height:266.66px;
}
*{
  box-shadow:unset!important;
  border:unset!important;
}
body{background-color:#000!important}
body>div.mobile-navbar>div.mobile-navbar-inner,
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container,
body>div.container,
body>div.container>div.navbar,
body>div.container>div.content,
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list,
body>div.container>div.navbar>div.drop-button,
body>div.container>div.top-content,
body>div.container>div.top-content>div.list-title,
body>div.container>div.gallery-content,
body>div.container>div.gallery-content>div,
body>div.container>div.page-container{background-color:unset!important}
body>div.mobile-navbar>div.mobile-navbar-inner,
body>div.container>div.navbar,
body>div.container>div.top-content>div.list-title{background-image:unset!important}
body>div.container>div.content>div.cover-column>a>h1,
body>div.container>div.content>div.gallery>h1,
body>div.container>div.content>div.gallery>h2,
body>div.container>div.navbar>div#logo>a>img,
body>div.container>div.gallery-content>div>h1,
body>div.container>div.gallery-content>div>div.artist-list,
body>div.container>div.gallery-content>div>div>p,
body>div.container>div.gallery-content>div>div>table>tbody>tr,
body>div.mobile-navbar{filter:brightness(.74)!important}
body>div.container>div.content{padding:10px!important}
body>div.container>div.content>div.cover-column{
  width:100%!important;
  margin:0px 0px 10px 0px!important;
}
body>div.container>div.content>div.cover-column>div.cover,
body>div.container>div.content>div.cover-column>div.cover>a,
body>div.container>div.content>div.cover-column>div.cover>a>picture,
body>div.container>div.content>div.cover-column>div.cover>a>picture>img{
  width:inherit!important;
  max-width:unset!important;
  max-height:unset!important;
  min-width:unset!important;
  min-height:unset!important;
}
body>div.container>div.content>div.gallery-preview{
  margin:10px 0px 0px 0px!important;
  padding:unset!important;
}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list{
  display:flex!important;
  flex-direction:row!important;
  flex-wrap:wrap!important;
  align-items:flex-end!important;
  margin:unset!important;
  padding:unset!important;
}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li:nth-child(odd)>div.thumbnail-container{margin:0px 5px 5px 0px!important}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li:nth-child(even)>div.thumbnail-container{margin:0px 0px 5px 0px!important}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container{
  width:var(--custom-width)!important;
  height:var(--custom-height)!important;
}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container>a,
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container>a>picture,
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container>a>picture>img{
  width:inherit!important;
  height:inherit!important;
  max-width:unset!important;
  max-height:unset!important;
  min-width:unset!important;
  min-height:unset!important;
  background-color:unset!important;
}
body>div.container>div.content>div.cover-column>div.cover>a>picture>img,
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list>li>div.thumbnail-container>a>picture>img{
  object-fit:scale-down!important;
}
body>div.container>div.gallery-content>div>a>div{
  height:220px!important;
  width:380px!important;
  margin:0px 0px 0px 15px!important;
}
body>div.container>div.gallery-content>div>a>div>div:nth-of-type(1){
  height:220px!important;
  width:160px!important;
  max-width:unset!important;
  min-width:unset!important;
  background-color:unset!important;
  outline:unset!important;
  left:-2px!important;
}
body>div.container>div.gallery-content>div>a>div>div:nth-of-type(2){
  height:220px!important;
  width:160px!important;
  max-width:unset!important;
  min-width:unset!important;
  background-color:unset!important;
  outline:unset!important;
  left:222px!important;
}
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions{
  margin:unset!Important;
  width:98vw!important;
  padding:unset!important;
}
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions>li>a{
  width:318px!important;
  padding:0px 0px 4px 8px!important;
}
body>div.container>div.top-content>div.list-title>h3{text-shadow:-1px -1px 0 var(--ts-color),1px -1px 0 var(--ts-color),-1px 1px 0 var(--ts-color),1px 1px 0 var(--ts-color),0 -2px 0 var(--ts-color),0 2px 0 var(--ts-color),-2px 0 0 var(--ts-color),2px 0 0 var(--ts-color)!important}
body>div.container>div.content>div.gallery>div.gallery-info>table>tbody>tr>td>ul.tags>li>a,
body>div.container>div.top-content>div.list-title>div.header-sort-select>select,
body>div.container>div.gallery-content>div>div>table>tbody>tr>td.relatedtags>ul>li>a,
body>div.container>div.navbar>div.header-table>div#search>input,
body>div.container>div.navbar>div.header-table>button,
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions>li{background-color:var(--bg-color)!important}
body>div.container>div.navbar>div.drop-button>span.icon-bar{background-color:var(--color)!important}
body>div.container>div.top-content>div.list-title>div.header-sort-select>select,
body>div.container>div.top-content>div.list-title>h3,
body>div.container>div.navbar>div.header-table>div#search>input,
body>div.container>div.navbar>div.header-table>div#search>input::placeholder,
body>div.container>div.navbar>div.header-table>button,
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions>li>a,
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions>li>a>span,
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions>li>div{color:var(--color)!important}
body>div.container>div.page-container>ul>li{color:var(--user-color)!important}
body>div.container>div.page-container>ul>li>a{color:#777799!important}
body>div.container>div.content>div.gallery-preview>div.simplePagerContainer>ul.thumbnail-list,
body>div.container>div.navbar>div.header-table>div#search>input:focus,
body>div.container>div.navbar>div.header-table>div#search>ul#search-suggestions{outline:unset!important}
body>div.mobile-navbar{
  display:flex!important;
  position:absolute!important;
  flex-direction:row!important;
  flex-wrap:nowrap!important;
  width:100%!important;
}
body>div.mobile-navbar>div.mobile-navbar-inner{width:inherit!important}
body>div#mobileImages{
  display:flex!important;
  height:100%!important;
  align-items:center!important;
  justify-content:center!important;
  align-content:center!important;
}
body>div.container>div.gallery-content>div>a>div>div:last-of-type,
body>div.container>div#nozomi-link,
body>div.container>div.bottom-content,
body>div.container>div.donate{
  display:none!important;
  z-index:unset!important;
  position:unset!important;
  left:unset!important;
  width:unset!important;
  height:unset!important;
  background-color:unset!important;
  outline:unset!important;
}</style>`;
})()