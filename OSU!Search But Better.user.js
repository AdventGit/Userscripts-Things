// ==UserScript==
// @name         OSU!Search But Better
// @namespace    AdventShit
// @version      4.5
// @description  Filters artists and mappers from select catagories, disables next page on scroll, automatically hides maps you've clicked before, and binds the Enter Key to search and N to next page.
// @author       Advent
// @match        *://osusearch.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
var osbbJ=null;
if(await GM.getValue('tmS')){
  osbbJ=JSON.parse(await GM.getValue('tmS','{}'));
}else{
  osbbJ={};
  osbbJ.tF=['loved','qualified','ranked','unranked'];
  osbbJ.blA=[];
  osbbJ.blM=[];
  osbbJ.ids=[];
  GM_setValue('tmS',JSON.stringify(osbbJ));
}

function resetBMs(){
  const ctx=$('body>div:not([class])>div#root:not(.osbbC) div#beatmap-container>div#beatmap-list');
  $('div.beatmap',ctx).each(function(){
    const onCur=$(this);
    if(onCur.hasClass('toNuke')){onCur.removeClass('toNuke')}
  });
  deleteBadMaps(ctx);
  seenDeleter(ctx);
}

function setData(jType,obj){
  var osbbJS=null;
  if(jType===0){
    osbbJS=new Set(osbbJ.ids);
    if(!osbbJS.has(obj)){osbbJ.ids.push(obj)}
  }else if(jType===1){
    osbbJ.tF.push(obj)
  }else if(jType===2){
    osbbJS=new Set(osbbJ.blA);
    if(!osbbJS.has(obj)){osbbJ.blA.push(obj)}
  }else if(jType===3){
    osbbJS=new Set(osbbJ.blM);
    if(!osbbJS.has(obj)){osbbJ.blM.push(obj)}
  }
  delete osbbJS
  GM_setValue('tmS',JSON.stringify(osbbJ));
}

function setBF(t,obj){
  obj.delete(t);
  osbbJ.tF=Array.from(obj);
  GM_setValue('tmS',JSON.stringify(osbbJ));
}

function setTF(ctx){
  ctx.off();
  ctx.on('click',function(e){
    e.preventDefault();
    const buttonV=ctx.text().toLowerCase();
    var osbbJS=new Set(osbbJ.tF);
    if(!ctx.hasClass('selected')){
      if(!osbbJS.has(buttonV)){setData(1,buttonV)}
      ctx.addClass('selected');
    }else{
      if(osbbJS.has(buttonV)){setBF(buttonV,osbbJS)}
      ctx.removeClass('selected');
    }
    delete osbbJS;
    resetBMs();
  });
}

function setAM(jType,ctx){
  ctx.off();
  ctx.on('click',function(e){
    e.preventDefault();
    if(jType===2){osbbJ.blA=$('textarea.osbbCTA').val().split('\n')}else if(jType===3){osbbJ.blM=$('textarea.osbbCTM').val().split('\n')}
    GM_setValue('tmS',JSON.stringify(osbbJ));
    resetBMs();
  });
}

function shouldDel(cur,list){for(var blItem of list){if(cur.includes(blItem.toLowerCase())){return(true)}}return(false)}

function isBadMap(ctx,status){
  $('div.beatmap.'+status,ctx).each(function(){
    const baseTarget=$('>div.ui>div.row>div.beatmap-info',this);
    if(shouldDel($('>div.row:nth-of-type(2)>span',baseTarget).text().toLowerCase(),osbbJ.blA)||shouldDel($('>div.row:nth-of-type(3)>span',baseTarget).text().toLowerCase().split(' [')[0],osbbJ.blM)){$(this).addClass('toNuke')}
  })
}

function deleteBadMaps(ctx){
  for(var bmType of osbbJ.tF){isBadMap(ctx,bmType)}
}

function seenDeleter(ctx){
  const bms=$('div.beatmap',ctx);
  bms.removeClass('toDel');
  var osbbJIS=new Set(osbbJ.ids);
  bms.each(function(){
    const onCur=$(this);
    if(osbbJIS.has(onCur.attr('data-id'))){onCur.addClass('toNuke')}
  });
  delete osbbJIS
  $('>div.ui>div.row>div.beatmap-image',bms).on('click',function(e){
    e.preventDefault();
    const parent=$(this).parent().parent().parent();
    if(!parent.hasClass('toDel')){
      setData(0,parent.attr('data-id'));
      parent.addClass('toDel');
    }
  });
}

function clickToBL(ctx){
  const bms=$('div.beatmap',ctx);
  bms.each(function(){
    const onCur=$(this);
    if(!onCur.hasClass('toNuke')){
      const bmsI=$('div.beatmap-info',onCur);
      const bmsA=$('>div.row:nth-of-type(2)>span',bmsI);
      const bmsP=$('>div.row:nth-of-type(3)',bmsI);
      if($('>div.row.cd',bmsI).length===0){$('<div class="row truncate cd"></div>').insertAfter(bmsP)}
      var bmsD=$('>div.row:nth-of-type(4)',bmsI);
      if($('>div.row.cd>img',bmsI).length===0){$('<img src="/static/img/users81.png" class="beatmap-data-icon" title="Difficulty Name"></img>').appendTo(bmsD)}
      $('>span>span',bmsP).appendTo(bmsD);
      const bmsM=$('>span',bmsP);
      bmsD=$('>span',bmsD);
      bmsD.text(bmsD.text().slice(1,-1));
      bmsA.on('click',function(){
        setData(2,$(this).attr('title').toLowerCase());
        deleteBadMaps(ctx);
        $('textarea.osbbCTA').val(osbbJ.blA.toString().split(',').join('\n'));
      });
      bmsM.on('click',function(){
        setData(3,$(this).attr('title').toLowerCase());
        deleteBadMaps(ctx);
        $('textarea.osbbCTM').val(osbbJ.blM.toString().split(',').join('\n'));
      });
    }
  });
}

function blankSkip(ctx,bmc){
  if($('div.beatmap:not(.toNuke)',ctx).length===0){
    const nextButton=$('>div.one>div.column>span>a:contains("[Next]")',bmc);
    if(nextButton.length!==0){nextButton[0].click()}
  }
}

function mutAction(bmc){
  $('>div:not([class])',bmc).remove();
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
  clickToBL(bms);
  blankSkip(bms,bmc);
}

(function(){
  'use strict';
  $('head').append(`<style type="text/css">:root{
  --sb-padding:.75rem;
  --sb-loc:calc(100% - (3rem + (var(--sb-padding) * 2)));
}
  div.beatmap-info>div.row:nth-of-type(2)>span:hover,
  div.beatmap-info>div.row:nth-of-type(3)>span:hover{
  color:#33B5E5!important;
  cursor:pointer!important;
  text-decoration:underline!important;
}
button.osbbCASB,
button.osbbCMSB{
  padding:var(--sb-padding)!important;
  margin:var(--sb-padding) 0px 0px var(--sb-loc)!important;
}
textarea.osbbCTA,
textarea.osbbCTM{
  background:#000!important;
  color:#FFF!important;
  border:2px solid #272727 !important;
  padding:0.5rem 0rem 0.5rem 0.75rem!important;
  margin:1rem 0px 0px 1rem!important;
  width:calc(100% - 2rem)!important;
  min-height:unset!important;
  max-height:unset!important;
  height:20em!important;
}
.beatmap-diffname{margin:0px!important}
.toDel{opacity:.5!important}
.toNuke{
  -webkit-appearance:none!important;
  -webkit-box-direction:unset!important;
  -webkit-box-orient:unset!important;
  -webkit-box-pack:unset!important;
  animation:unset!important;
  background:transparent!important;
  border-radius:0px!important;
  border:none!important;
  bottom:unset!important;
  box-shadow:none!important;
  box-sizing:unset!important;
  color:unset!important;
  cursor:unset!important;
  display:none!important;
  flex-direction:unset!important;
  flex-wrap:unset!important;
  font-size:0px!important;
  height:0px!important;
  justify-content:unset!important;
  left:unset!important;
  letter-spacing:0px!important;
  line-height:0px!important;
  margin:0px!important;
  opacity:0!important;
  outline:unset!important;
  overflow:unset!important;
  padding:0px!important;
  pointer-events:unset!important;
  position:absolute!important;
  right:unset!important;
  text-align:unset!important;
  text-transform:unset!important;
  top:unset!important;
  transform:unset!important;
  transition:unset!important;
  vertical-align:unset!important;
  visibility:hidden!important;
  width:0px!important;
  z-index:-99999!important;
}</style>`);
  const base=$('body>div:not([class])');
  const bRoot=$('>div#root:not(.osbbC)',base);
  $(`<div id="root" class="osbbC ui grid search toNuke">
  <div class="content centered sixteen wide computer" style="width:100%!important">
    <div class="ui grid app-m__container___17azB" style="background:transparent!important">
      <div class="content centered fourteen wide computer fifteen wide mobile column app-m__content___3Yi8a">
        <form class="ui form">
          <div class="ui grid search-form">
            <div class="row">
              <div class="column">
                <div class="ui grid one column doubling grid form-field">
                  <div class="row title">
                    <div class="sixteen wide column">
                      <h2>Types To Filter</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column">
                      <div class="button-section">
                        <button class="ui basic button select-button osbbBLoved">Loved</button>
                        <button class="ui basic button select-button osbbBQualified">Qualified</button>
                        <button class="ui basic button select-button osbbBRanked">Ranked</button>
                        <button class="ui basic button select-button osbbBUnranked">Unranked</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="ui grid one column doubling grid form-field">
                  <div class="row title">
                    <div class="sixteen wide column">
                      <h2>Blacklisted Artists</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column">
                      <div class="ui grid">
                        <textarea class="osbbCTA">`+osbbJ.blA.toString().split(',').join('\n')+`</textarea>
                        <button class="ui basic button select-button osbbCASB">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <div class="ui grid one column doubling grid form-field">
                  <div class="row title">
                    <div class="sixteen wide column">
                      <h2>Blacklisted Mappers</h2>
                    </div>
                  </div>
                  <div class="row">
                    <div class="column">
                      <div class="ui grid">
                        <textarea class="osbbCTM">`+osbbJ.blM.toString().split(',').join('\n')+`</textarea>
                        <button class="ui basic button select-button osbbCMSB">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>`).insertAfter(bRoot);
  const osbbBLoved=$('button.osbbBLoved');
  const osbbBQualified=$('button.osbbBQualified');
  const osbbBRanked=$('button.osbbBRanked');
  const osbbBUnranked=$('button.osbbBUnranked');
  for(const i of osbbJ.tF){if(i==='loved'){osbbBLoved.addClass('selected')}else if(i==='qualified'){osbbBQualified.addClass('selected')}else if(i==='ranked'){osbbBRanked.addClass('selected')}else if(i==='unranked'){osbbBUnranked.addClass('selected')}}
  setTF(osbbBLoved);
  setTF(osbbBQualified);
  setTF(osbbBRanked);
  setTF(osbbBUnranked);
  const osbbCASB=$('button.osbbCASB');
  const osbbCMSB=$('button.osbbCMSB');
  setAM(2,osbbCASB);
  setAM(3,osbbCMSB);
  const osbbC=$('>div.osbbC',base);
  const osM=$('>div.fixed-bar>div.ui.menu>div.menu:not(.right)',base);
  $(`<a class="navbar-button item osbbCB"><i class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/></svg></i>OSBB Config</a>`).appendTo(osM);
  $('>a.osbbCB',osM).on('click',()=>{
    if(!bRoot.hasClass('toNuke')){
      bRoot.addClass('toNuke');
      osbbC.removeClass('toNuke');
    }else{
      bRoot.removeClass('toNuke');
      osbbC.addClass('toNuke');
    }
  });
  const mo=window.MutationObserver;
  const entry=new mo(function(){
    const bmContainer=$('div#beatmap-container',bRoot);
    if($('>div#beatmap-list',bmContainer).length!==0){
      entry.disconnect();
      const disableButton=$('>div.one>div.column>span>a:contains("[Disable]")',bmContainer);
      if(disableButton.length!==0){disableButton[0].click()}
      $(document).on('keypress',function(e){
        if(e.keyCode===13){
          if(!bRoot.hasClass('toNuke')){
            e.preventDefault();
            $('div.ui.grid.search-form>div.row>div.column>div.ui.centered.grid>div.twelve.wide>div.ui.grid>div.thirteen.wide>button.large.fluid.ui.button').click();
            return(true);
          }
        }
      });
      new mo(function(){mutAction(bmContainer)}).observe(bmContainer[0],{attributeOldValue:false,attributes:false,characterData:true,characterDataoldValue:false,childList:false,subtree:true});
      mutAction(bmContainer);
    }
  });
  entry.observe($('body>div:not([class])>div#root>div.content>div.ui>div.content>form.ui>div.ui>div.row>div.column>div.ui>div.column>div.ui>div.column>button:not(.reset-button)')[0],{attributeOldValue:false,attributes:true,characterData:false,characterDataoldValue:false,childList:false,subtree:false});
})();
