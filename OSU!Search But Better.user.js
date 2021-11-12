//==UserScript==
//@name        OSU!Search But Better
//@namespace   AdventShit
//@version     4.4
//@description Filters ranked, unranked, and qualified maps, removes loved, disables next page on scroll, automatically hides maps you've clicked before, and binds the Enter Key to search and N to next page.
//@author      Advent
//@match       *://osusearch.com/*
//@grant       GM_setValue
//@grant       GM_getValue
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/OSU!Search%20But%20Better.user.js
//==/UserScript==
/*User Editable Shit*/
const blacklistArtists=[];
const blacklistMappers=[];
const toFilter=['qualified','ranked','unranked'];
/*End of User Editable Shit*/
function shouldDel(cur,list){for(var blItem of list){if(cur.includes(blItem.toLowerCase())){return(true)}}return(false)}
function isBadMap(ctx,status){
  $('div.beatmap.'+status,ctx).each(()=>{
    const baseTarget=$('>div.ui>div.row>div.beatmap-info',this);
    if(shouldDel($('>div.row:nth-of-type(2)>span',baseTarget).text().toLowerCase(),blacklistArtists)||shouldDel($('>div.row:nth-of-type(3)>span',baseTarget).text().toLowerCase().split(' [')[0],blacklistMappers)){$(this).addClass('toNuke')}
  })
}
function deleteBadMaps(ctx){
  $('div.beatmap:not(.loved)',ctx).removeClass('toNuke');
  $('div.beatmap.loved:not(.toNuke)',ctx).addClass('toNuke');
  for(var bmType of toFilter){isBadMap(ctx,bmType)}
}
function seenDeleter(ctx){
  const bms=$('div.beatmap',ctx);
  bms.removeClass('toDel');
  bms.each(()=>{
    const onCur=$(this);
    if(GM_getValue(onCur.attr('data-id'),false)){onCur.addClass('toNuke')}
  });
  $('>div.ui>div.row>div.beatmap-image',bms).on('click',function(e){
    e.preventDefault();
    const parent=$(this).parent().parent().parent();
    if(!parent.hasClass('toDel')){
      GM_setValue(parent.attr('data-id'),true);
      parent.addClass('toDel');
    }
  });
}
function blankSkip(ctx,bmc){
  if($('div.beatmap:not(.toNuke)',ctx).length===0){
    const nextButton=$('>div.one>div.column>span>a:contains("[Next]")',bmc);
    if(nextButton.length!==0){
      nextButton[0].click()
    }
  }
}
function mutAction(bmc){
  const curTarget=$('>div.one>div.column>span',bmc);
  if(curTarget.length!==0){
    $('>span:contains("Scroll down to load more beatmaps")',curTarget).remove();
    $('>a:contains("[Enable]")',curTarget).remove();
    const nextButton=$('>a:contains("[Next]")',curTarget);
    nextButton.css('margin-left','unset');
    $(document).off('keypress.nb');
    $(document).on('keypress.nb','body',function(e){
      if(e.keyCode===110&e.target.nodeName==='BODY'){
        e.preventDefault();
        nextButton[0].click();
        return(true);
      }
    });
  }
  const bms=$('>div#beatmap-list',bmc);
  deleteBadMaps(bms);
  seenDeleter(bms);
  blankSkip(bms,bmc);
}
(()=>{
  'use strict';
  const mo=window.MutationObserver;
  const entry=new mo(()=>{
    const bmContainer=$('div#beatmap-container');
    if($('>div#beatmap-list',bmContainer).length!==0){
      entry.disconnect();
      $('head').append('<style type="text/css">.toDel{opacity:.5!important;}.toNuke{-webkit-appearance:none!important;-webkit-box-direction:unset!important;-webkit-box-orient:unset!important;-webkit-box-pack:unset!important;animation:unset!important;background:transparent!important;border-radius:0px!important;border:none!important;bottom:unset!important;box-shadow:none!important;box-sizing:unset!important;color:unset!important;cursor:unset!important;display:none!important;flex-direction:unset!important;flex-wrap:unset!important;font-size:0px!important;height:0px!important;justify-content:unset!important;left:unset!important;letter-spacing:0px!important;line-height:0px!important;margin:0px!important;opacity:0!important;outline:unset!important;overflow:unset!important;padding:0px!important;pointer-events:unset!important;position:absolute!important;right:unset!important;text-align:unset!important;text-transform:unset!important;top:unset!important;transform:unset!important;transition:unset!important;vertical-align:unset!important;visibility:hidden!important;width:0px!important;z-index:-99999!important;}</style>');
      const disableButton=$('>div.one>div.column>span>a:contains("[Disable]")',bmContainer);
      if(disableButton.length!==0){disableButton[0].click()}
      $(document).on('keypress',function(e){
        if(e.keyCode===13){
          e.preventDefault();
          $('div.ui.grid.search-form>div.row>div.column>div.ui.centered.grid>div.twelve.wide>div.ui.grid>div.thirteen.wide>button.large.fluid.ui.button').click();
          return(true);
        }
      });
      new mo(()=>{mutAction(bmContainer)}).observe(bmContainer[0],{attributeOldValue:false,attributes:false,characterData:true,characterDataoldValue:false,childList:false,subtree:true});
      mutAction(bmContainer);
    }
  });
  entry.observe($('body>div:not([class])>div#root>div.content>div.ui>div.content>form.ui>div.ui>div.row>div.column>div.ui>div.column>div.ui>div.column>button:not(.reset-button)')[0],{attributeOldValue:false,attributes:true,characterData:false,characterDataoldValue:false,childList:false,subtree:false});
})();