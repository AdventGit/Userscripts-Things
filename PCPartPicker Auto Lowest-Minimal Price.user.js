//==UserScript==
//@name        PCPartPicker Auto Lowest-Minimal Price
//@namespace   AdventShit
//@version     1.0
//@description Automatically sets the lowest price to the minimal value.
//@author      Advent
//@match       *://pcpartpicker.com/products/*/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/PCPartPicker%20Auto%20Lowest-Minimal%20Price.user.js
//==/UserScript==
function mutAction(){
  var onCur=window.location.href;
  if(!onCur.includes('X=1,')&onCur.includes('X=')){window.location.href=onCur.replace(/(X=.*,)/,'X=1,')}
}
(()=>{
  'use strict';
  new MutationObserver(function(m){m.forEach(()=>{mutAction()})}).observe(document.querySelector('body'),{childList:true,subtree:true});
  mutAction();
})();