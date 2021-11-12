//==UserScript==
//@name        PCPartPicker Clickable Custom Links
//@namespace   AdventShit
//@version     3.0
//@description Makes the custom part links actually navigate.
//@author      Advent
//@match       *://pcpartpicker.com/list*
//@match       *://pcpartpicker.com/user/*/saved*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/PCPartPicker%20Clickable%20Custom%20Links.user.js
//==/UserScript==
var curWindowHREF=window.location.href;
function entry(){
  window.onpopstate=()=>{
    const curHREF=window.location.href;
    if(curWindowHREF!==curHREF){
      curWindowHREF=curHREF;
      loop();
    }
  }
}
function loop(){
  const baseTarget='div.partlist>table>tbody>tr.tr__product>td.td__name>div[id^="custom_part_"]>div.custom-part-url';
  const styleLoc='head>style.pcppCustomLinks';
  const styleEle=$(styleLoc);
  const hrefSplit=curWindowHREF.split('.com/').pop().split('/');
  const curLoc=hrefSplit[0];
  const secLoc=hrefSplit[2];
  var thirdLoc=false;
  var curTarget=undefined;
  if(typeof hrefSplit[3]!=='undefined'){
    const baseThirdLoc=hrefSplit[3];
    if(baseThirdLoc===''||baseThirdLoc.charAt(0)==='#'){thirdLoc=true}
  }
  if(styleEle.length!==0){styleEle.remove()}
  if(curLoc==='list'||(secLoc==='saved'&!thirdLoc)){
    curTarget='div.partlist__wrapper>'+baseTarget
  }else if(curLoc==='user'||thirdLoc){curTarget='div.partlist__wrapper>div.block>'+baseTarget}
  if(curTarget!=='undefined'){
    $('head').append('<style class="pcppCustomLinks">'+curTarget+'{cursor:pointer!important;color:#33B5E5!important;}'+curTarget+':hover{text-decoration:underline!important;}</style>');
    $('body').on('DOMNodeInserted',curTarget,()=>{
      const clickTarget=$(this);
      clickTarget.on('click',()=>{window.open(clickTarget.text())});
    });
  }
}
(()=>{
  'use strict';
  entry();
  loop();
})();