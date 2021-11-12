//==UserScript==
//@name        ATF Theme (Desktop and Mobile)
//@namespace   AdventShit
//@version     2.1
//@description A theme for ATF.
//@author      Advent
//@match       *://booru.allthefallen.moe/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/ATF%20Theme%20(Desktop%20and%20Mobile).user.js
//==/UserScript==
/*Set Desktop/Mobile Status Below*/
const isMobile=false;
/*No Touch Below*/
function deleteEles(parents,eles){for(const parent of parents){for(const ele of eles){parent.querySelector(ele).remove()}}}
function deleteAllElesOfType(parents,type){
 for(const parent of parents){
  var shouldCont=true
  while(shouldCont){
   for(const ele of type){
    const toDel=parent.querySelector(ele);
    if(toDel){toDel.remove()}else{shouldCont=false}
   }
  }
 }
}
function stripText(eles){
 var ns=eles.childNodes;
 for(var i=0;i<ns.length;i++){
  var n=ns[i];
  if(n.nodeType==Node.TEXT_NODE){
   n.parentNode.removeChild(n);
   i--;
  }else{if(n.nodeType==Node.ELEMENT_NODE){stripText(n)}}
 }
}
function parentChildNotices(parent,newParent){
 for(const onCur of [['child','parent'],['parent','children']]){
  const parentChildNotice=parent.querySelector('div.post-notice-'+onCur[0]);
  if(parentChildNotice){
   if(parentChildNotice.querySelector('div#has-'+onCur[1]+'-relationship-preview').getAttribute('style')){parentChildNotice.querySelector('a#has-'+onCur[1]+'-relationship-preview-link').click()}
   stripText(parentChildNotice);
   deleteEles([parentChildNotice],['a:first-of-type','a.wiki-link','a#has-'+onCur[1]+'-relationship-preview-link']);
   parent.insertBefore(document.createDocumentFragment().appendChild(parentChildNotice),newParent.nextSibling);
  }
 }
}
var inImageView=false;
if(isMobile){document.head.insertAdjacentHTML('beforeend',`<style id="ATF-Things-Main">:root{--body-background-color:#000;--text-color:#DDDDDD;--muted-text-color:#AAAAAA;--header-color:#777777;--link-color:#33B5E5;--link-hover-color:#33B5E5;--error-background-color:#000;--success-background-color:#000;--warning-background-color:#000;--target-background:#000;--subnav-menu-background-color:#000;--responsive-menu-background-color:var(--link-hover-color);--responsive-sidebar-submit-button-background-color:#000;--responsive-sidebar-submit-button-border:1px solid #000;--form-input-text-color:var(--text-color);--form-input-background:var(--body-background-color);--form-input-border:1px solid #ccc;--form-input-placeholder-text-color:grey;--form-button-text-color:var(--form-input-text-color);--form-button-background:#000;--form-button-border:var(--form-input-border);--form-button-hover-background:#000;--form-button-hover-box-shadow:0 0 2px grey;--form-button-active-background:#000;--form-button-active-border:var(--form-button-border);--form-button-active-color:var(--form-button-text-color);--quick-search-form-background:var(--body-background-color);--user-upgrade-gold-background-color:#fff380;--user-upgrade-platinum-background-color:#000;--user-upgrade-table-row-hover-background-color:#000;--table-header-border:2px solid #000;--table-row-border:1px solid #000;--table-row-hover-background:#000;--table-even-row-background:#000;--preview-pending-color:#00f;--preview-flagged-color:#FFFF00;--preview-deleted-color:#FF0000;--preview-has-children-color:#0f0;--preview-has-parent-color:#FF00FF;--preview-icon-color:#000;--preview-icon-background:rgba(0,0,0,0.5);--uploads-dropzone-background:#000;--uploads-dropzone-progress-bar-foreground-color:var(--link-color);--uploads-dropzone-progress-bar-background-color:var(--link-hover-color);--forum-vote-up-color:green;--forum-vote-meh-color:#daa520;--forum-vote-down-color:red;--forum-topic-status-new-color:#c65353;--forum-topic-status-pending-color:#708ca9;--forum-topic-status-approved-color:#70a970;--forum-topic-status-rejected-color:#a97070;--moderation-report-text-color:red;--moderation-report-border:2px solid #000;--comment-sticky-background-color:var(--subnav-menu-background-color);--post-tooltip-background-color:var(--body-background-color);--post-tooltip-border-color:#000;--post-tooltip-header-background-color:var(--subnav-menu-background-color);--post-tooltip-info-color:#555;--post-tooltip-scrollbar-background:#000;--post-tooltip-scrollbar-border:0 none #000;--post-tooltip-scrollbar-thumb-color:#000;--post-tooltip-scrollbar-track-background:#000;--post-tooltip-scrollbar-track-border:0 none #000;--preview-current-post-background:rgba(0,0,0,0.1);--autocomplete-selected-background-color:var(--subnav-menu-background-color);--autocomplete-border:1px solid #000;--autocomplete-arrow-color:var(--text-color);--diff-list-added-color:green;--diff-list-removed-color:red;--diff-list-obsolete-added-color:#006400;--diff-list-obsolete-removed-color:#8b0000;--wiki-page-versions-diff-del-background:#000;--wiki-page-versions-diff-ins-background:#000;--post-notice-border:1px solid #000;--post-parent-notice-background:var(--success-background-color);--post-child-notice-background:var(--warning-background-color);--post-pending-notice-background:#000;--post-flagged-notice-background:var(--error-background-color);--post-banned-notice-background:var(--error-background-color);--post-deleted-notice-background:var(--error-background-color);--post-appealed-notice-background:#000;--post-resized-notice-background:#000;--post-search-notice-background:#000;--post-artist-commentary-container-background:#000;--post-artist-commentary-container-border:1px solid #000;--note-body-background:#000;--note-body-text-color:var(--text-color);--note-body-border:1px solid #000;--note-box-border:1px solid #000;--note-box-shadow:0 0 0 1px #000;--unsaved-note-box-border:1px solid red;--movable-note-box-border:1px solid green;--note-preview-border:1px solid red;--note-preview-background:#000;--note-highlight-color:#00f;--note-tn-color:var(--muted-text-color);--series-pool-color:#a0a;--series-pool-hover-color:#b6b;--fetch-source-data-border:1px solid #000;--post-mode-menu-edit-background:#5c5;--post-mode-menu-tag-script-background:#d6d;--post-mode-menu-add-fav-background:#ffa;--post-mode-menu-remove-fav-background:#ffa;--post-mode-menu-vote-up-background:#afa;--post-mode-menu-vote-down-background:#faa;--post-mode-menu-translation-background:#5cd;--tag-count-color:var(--muted-text-color);--low-post-count-color:red;--tag-count-indicator-frown-color:red;--tag-count-indicator-meh-color:#bdb76b;--tag-count-indicator-smile-color:green;--remove-favorite-button:#ff1493;--ugoira-seek-slider-background:#000;--ugoira-seek-slider-progressbar-background:#000;--keyboard-shortcut-color:#fff;--keyboard-shortcut-background-color:#000;--error-message-color:#a00;--bulk-update-request-approved-color:green;--bulk-update-request-failed-color:red;--login-link-color:#e00;--footer-border:1px solid #000;--jquery-ui-widget-content-background:var(--body-background-color);--jquery-ui-widget-content-text-color:var(--text-color);--jquery-ui-dialog-box-shadow:2px 2px 1px #000;--notice-error-background:var(--error-background-color);--notice-error-border:1px solid #000;--notice-info-background:var(--warning-background-color);--notice-info-border:1px solid #000;--dtext-blockquote-border:1px solid #000;--dtext-blockquote-background:#000;--dtext-code-background:#000#eee;--dtext-expand-border:1px inset #000;--dtext-spoiler-background-color:#000;--dtext-spoiler-hover-color:#fff;--wiki-page-other-name-background-color:#000;--paginator-ellipsis-color:grey;--general-tag-color:var(--link-color);--general-tag-hover-color:var(--link-hover-color);--character-tag-color:#0a0;--character-tag-hover-color:#6b6;--copyright-tag-color:#a0a;--copyright-tag-hover-color:#b6b;--artist-tag-color:#a00;--artist-tag-hover-color:#b66;--meta-tag-color:#f80;--meta-tag-hover-color:#fa6;--selected-tag-color:#fff;--user-admin-color:red;--user-moderator-color:orange;--user-builder-color:#63f;--user-platinum-color:grey;--user-gold-color:#00f;--user-member-color:var(--link-color);--news-updates-background:#000;--news-updates-border:2px solid #000;--related-tags-container-background:#000;--base-margin:32px;--base-padding:6px;--paginator-padding:calc(var(--base-margin) / 2);--tags-top-padding:calc(var(--base-margin) - 6px);--odd-li-padding:calc(var(--base-padding) - 1px);--side-item-padding:calc(var(--base-margin) + var(--base-padding) + 2px);--tag-padding:calc(var(--base-padding) + 16px);}#nuke{display:none!important;}body>header#top,body>div#page,body>header#top>h1#app-name-header,body>header#top>nav#nav,body>footer#page-footer,body>header#top>h1#app-name-header>a{display:flex!important}body>div#page>div#c-posts>div#a-index>div.sidebar-container>section#content>div#posts>div#posts-container>article{display:flex!important;justify-content:center!important;}body>header#top,body>div#page,body>header#top>h1#app-name-header,body>header#top>nav#nav,body>footer#page-footer,body>header#top>h1#app-name-header>a,body>div#page>div#c-posts>div#a-index>div.sidebar-container>section#content>div#posts>div#posts-container>article,body>div#page>div#c-posts>div>div.sidebar-container>section#content,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section.image-container,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li>a:nth-of-type(1),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li>span,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li>a:nth-of-type(1),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li>span{margin:unset!important;padding:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview>a>picture>img,body>div#page>div#c-posts>div>div.sidebar-container>section#content>div.notice,body>div#page>div#c-posts>div>div.sidebar-container>section#content>div.notice>div[id^="has-"]>article.post-preview>a>picture>img{border:unset!important}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div.notice{border:unset!important}body>header#top>nav#nav>menu#main-menu{background:#000!important}a,abbr,acronym,address,blockquote,caption,cite,code,dd,del,dfn,dl,dt,em,fieldset,form,h1,h2,h3,h4,h5,h6,img,label,legend,li,ol,p,pre,q,s,samp,small,strike,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,tt,ul,var{line-height:unset!important}body>header#top,body>div#page,body>header#top>h1#app-name-header{flex-direction:column!important}body>footer#page-footer,body>header#top>nav#nav{flex-direction:row!important}body>footer#page-footer,body>header#top>h1#app-name-header>a,body>header#top>nav#nav{justify-content:center!important}body>div#page>div#c-posts>div#a-index>div.sidebar-container>section#content>div#posts>div#posts-container{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;}body>header#top>h1#app-name-header>a>img:hover{cursor:pointer!important}body>div#page>div#c-posts>div#a-index>div.sidebar-container>section#content>div#posts>div.paginator{margin-top:var(--paginator-padding)!important;margin-left:unset!important;margin-right:unset!important;margin-bottom:unset!important;padding:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview,body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview>a>picture>img{width:8vw!important;height:8vw!important;min-width:unset!important;min-height:unset!important;max-width:unset!important;max-height:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview>a>picture>img{position:absolute!important;top:0px!important;left:0px!important;right:0px!important;bottom:0px!important;object-fit:cover!important;border:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section.image-container>p{display:flex!important;flex-flow:row wrap!important;gap:0px 0px!important;justify-content:center!important;align-items:center!important;align-content:center!important;margin-top:unset!important;margin-bottom:unset!important;margin-left:unset!important;margin-right:unset!important;padding:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div.post-notice-parent,body>div#page>div#c-posts>div>div.sidebar-container>section#content>div.post-notice-child{display:flex!important;flex-flow:row wrap!important;gap:0px 0px!important;justify-content:center!important;align-items:center!important;align-content:center!important;margin-top:var(--base-padding)!important;margin-bottom:0px!important;margin-left:0px!important;margin-right:0px!important;padding:unset!important;width:100%!important;border:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list>ul{margin-top:unset!important;margin-bottom:unset!important;margin-left:var(--base-margin)!important;margin-right:var(--base-margin)!important;background:rgb(28,28,28)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list>ul:first-of-type{margin-top:var(--base-margin)!important}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list>ul:last-of-type{margin-bottom:var(--base-margin)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list{margin-top:var(--tags-top-padding)!important;margin-bottom:var(--base-margin)!important;margin-left:var(--base-margin)!important;margin-right:var(--base-margin)!important;background:rgb(28,28,28)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul>li,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li{display:flex!important;flex-flow:row nowrap!important;gap:0px 0px!important;justify-content:flex-start!important;align-items:flex-start!important;align-content:flex-start!important;padding-top:var(--base-padding)!important;padding-bottom:var(--base-padding)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul>li:last-of-type,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list>ul:last-of-type>li:last-of-type,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li:last-of-type{margin-bottom:unset!important}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul>li:nth-child(even),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li:nth-child(even),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li:nth-child(even){background:rgb(44,44,44)!important;padding-top:var(--odd-li-padding)!important;padding-bottom:var(--odd-li-padding)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul>li>a:nth-of-type(1),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#post-information>ul>li>span{margin-left:var(--base-padding)!important}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li>a:nth-of-type(1),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li>a:nth-of-type(1){display:block!important;position:absolute!important;left:var(--side-item-padding)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li>a:nth-of-type(2),body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li>a:nth-of-type(2){margin-left:var(--tag-padding)!important;padding:unset!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-list>div.tag-list li>span,body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#tag-box>ul.tag-list>li>span{display:block!important;position:absolute!important;right:var(--side-item-padding)!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#search-box{display:flex!important;flex-flow:column nowrap!important;gap:0px 0px!important;justify-content:center!important;align-items:center!important;align-content:center!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#search-box>form#search-box-form{flex-flow:row wrap!important;width:85%!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#search-box>form#search-box-form>a{display:flex!important;flex-basis:100%!important;gap:0px 0px!important;justify-content:center!important;align-items:center!important;align-content:center!important;margin:12px 0px 0px 0px!important;}body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview,body>div#page>div#c-posts>div>div.sidebar-container>section#content>div#posts>div#posts-container>article.post-preview>a>picture>img{width:50vw!important;height:50vw!important;min-width:unset!important;min-height:unset!important;max-width:unset!important;max-height:unset!important;}</style>`)}
const hrefLoc=window.location.href.split('https://booru.allthefallen.moe/').pop().split('/').pop();
if(hrefLoc.length>5){if(hrefLoc.substring(0,5)!=='posts'){inImageView=true}}
if(isMobile){if(inImageView){document.head.insertAdjacentHTML('beforeend',`<style id="Non-Posts-Search-Margin">body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#search-box>form{margin-bottom:var(--base-margin)!important}</style>`)}else{document.head.insertAdjacentHTML('beforeend',`<style id="Posts-Search-Margin">body>div#page>div#c-posts>div>div.sidebar-container>section#content>section#search-box>form{margin-bottom:288px!important}</style>`)}}
(()=>{
 'use strict';
  const body=document.body;
  const headerTop=body.querySelector('header#top');
  const page=body.querySelector('div#page');
  const upgradeNotice=page.querySelector('div#upgrade-account-notice');
  const nav=headerTop.querySelector('nav');
  const mainMenu=nav.querySelector('menu#main-menu');
  const baseTarget=page.querySelector('div#c-posts>div>div.sidebar-container');
  const aside=baseTarget.querySelector('aside#sidebar');
  const blacklistBox=aside.querySelector('div#blacklist-box');
  const blacklistTarget=blacklistBox.querySelector('a#disable-all-blacklists');
  const sectionContent=baseTarget.querySelector('section#content');
  const search=aside.querySelector('section#search-box');
  body.querySelector('footer#page-footer').remove();
  deleteEles([headerTop],['a','div']);
  if(upgradeNotice){upgradeNotice.remove()}
  nav.querySelector('menu#subnav-menu').remove();
  deleteEles([mainMenu],['li#nav-comments','li#nav-notes','li#nav-wiki','li#nav-forum','li#nav-more']);
  if(!blacklistTarget.getAttribute('style')){blacklistTarget.click()}
  blacklistBox.remove();
  if(isMobile){
   sectionContent.prepend(document.createDocumentFragment().appendChild(search));
   search.querySelector('h2').remove();
  }
  if(inImageView){
   const resizeNotice=sectionContent.querySelector('div#image-resize-notice');
   const imageContainer=sectionContent.querySelector('section.image-container');
   if(resizeNotice){
    const viewOriginal=resizeNotice.querySelector('a');
    const picture=imageContainer.querySelector('picture');
    const image=picture.querySelector('img#image');
    if(viewOriginal){
     resizeNotice.remove();
     picture.querySelector('source').srcset=viewOriginal.href;
     image.src=viewOriginal.href;
    }
   }
   const pendingNotice=sectionContent.querySelector('div.post-notice-pending');
   const seekBar=sectionContent.querySelector('ul.post-notice-search');
   const favButton=sectionContent.querySelector('div.fav-buttons');
   const postInfo=aside.querySelector('section#post-information');
   const tags=aside.querySelector('section#tag-list');
   const tagList=tags.querySelector('div.tag-list');
   if(pendingNotice){pendingNotice.remove()}
   if(seekBar){seekBar.remove()}
   if(favButton){favButton.remove()}
   deleteEles([aside],['section#post-options','section#post-history']);
   deleteEles([postInfo],['h2']);
   deleteAllElesOfType([tagList],['h3']);
   var customUL=document.createElement('ul');
   customUL.setAttribute('id','merged-list');
   tagList.appendChild(customUL);
   customUL=tagList.querySelector('ul#merged-list');
   tagList.querySelectorAll('li').forEach(li=>{customUL.appendChild(document.createDocumentFragment().appendChild(li))});
   tagList.querySelectorAll('ul[class]').forEach(ul=>{ul.remove()});
   if(isMobile){
    sectionContent.insertBefore(document.createDocumentFragment().appendChild(postInfo),imageContainer.nextSibling);
    sectionContent.insertBefore(document.createDocumentFragment().appendChild(tags),imageContainer.nextSibling);
   }
   parentChildNotices(sectionContent,imageContainer);
  }else{
   const posts=sectionContent.querySelector('div#posts');
   const postsNotice=posts.querySelector('div.fineprint');
   const tags=aside.querySelector('section#tag-box');
   posts.querySelectorAll('div#posts-container>article.post-preview>a').forEach(a=>{
    a.addEventListener('click',()=>{a.setAttribute('id','nuke')});
    a.setAttribute('target','_blank');
   });
   if(postsNotice){postsNotice.remove()}
   deleteEles([aside],['section#options-box','section#mode-box']);
   deleteEles([tags],['h2']);
   if(isMobile){
    sectionContent.querySelector('menu#post-sections').remove();
    sectionContent.append(document.createDocumentFragment().appendChild(tags));
    search.querySelector('form').append(document.createDocumentFragment().appendChild(aside.querySelector('section#related-box>ul#related-list>li:first-of-type>a')));
   }
  }
  if(isMobile){aside.remove()}
})();