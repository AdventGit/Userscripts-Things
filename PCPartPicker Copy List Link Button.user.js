//==UserScript==
//@name        PCPartPicker Copy List Link Button
//@namespace   AdventShit
//@version     1.0
//@description Adds A Button To The Saved Parts List Page To Copy The Current List.
//@author      Advent
//@match       *://pcpartpicker.com/user/*/saved*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/PCPartPicker%20Copy%20List%20Link%20Button.user.js
//==/UserScript==
function mutAction(){
  var toast=$('body>div#pppcllb-Toast');
  if(toast.length===0){
    $('body').append('<div id="pppcllb-Toast" class="hidden" style="position:absolute;top:85%;left:50%;background:#000000;border:1px solid white;padding:12px;">Copied To Clipboard!</div>');
    toast=$('body>div#pppcllb-Toast');
  }
  if($('head>style#pppcllb').length===0){$('head').append('<style id="pppcllb">div#pppcllb-Toast.shown{visibility:visable;opacity:1;transition:opacity .25s linear;}div#pppcllb-Toast.hidden{visibility:hidden;opacity:0;transition:visibility 0s .25s, opacity .25s linear;}</style>')}
  const hrefSplit=window.location.href.split('.com/').pop().split('/');
  const userName=hrefSplit[1];
  const savedListLoc=hrefSplit[3];
  var thirdLoc=false;
  if(typeof savedListLoc!=='undefined'){if(savedListLoc===''||savedListLoc.charAt(0)==='#'){thirdLoc=true}}
  if(thirdLoc){
    var refresh=false;
    const baseTarget=$('body>section.main-wrapper>div>div.wrapper>section[class]>div.wrapper--columns');
    if(baseTarget.length!==0){
      const buttonTarget=$('>div.main-content>div.block>div#partlist_render>div.partlist__wrapper>div.partlist__title>div.partlist__title--actions',baseTarget);
      if(buttonTarget.length!==0){
        if($('>a.pppcllb',buttonTarget).length===0){
          buttonTarget.prepend('<a class="pppcllb button button--small">Share List</a>');
          $('>a.pppcllb',buttonTarget).on('click',()=>{
            navigator.clipboard.writeText('https://pcpartpicker.com/user/'+userName+'/saved/'+$('>li.list-active>a',$('div.sidebar-content>div.block>div.offCanvas>div.offCanvas__content>section[class]>div.partlist__folder>ul.group__content',baseTarget)).attr('href').substring(6));
            toast.removeClass('hidden');
            toast.addClass('shown');
            setTimeout(()=>{
              toast.removeClass('shown');
              toast.addClass('hidden');
            },1000);
          });
        }
      }else{refresh=true}
    }else{refresh=true}
    if(refresh){setTimeout(()=>{mutAction()},50)}
  }
}
(()=>{
  'use strict';
  new MutationObserver(function(m){m.forEach(()=>{mutAction()})}).observe(document.querySelector('body'),{childList:true,subtree:true});
})();