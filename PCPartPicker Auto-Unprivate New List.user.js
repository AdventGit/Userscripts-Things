//==UserScript==
//@name        PCPartPicker Auto-Unprivate New List
//@namespace   AdventShit
//@version     1.1
//@description Automatically unsets any new list to not Private.
//@author      Advent
//@match       *://pcpartpicker.com/list*
//@match       *://pcpartpicker.com/user/*/saved*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/PCPartPicker%20Auto-Unprivate%20New%20List.user.js
//==/UserScript==
function hook(){
  const privateCheckbox=$('input#partlist_save_new_private');
  if(privateCheckbox.is(':checked')){privateCheckbox.click()}
}
(()=>{
  'use strict';
  const curLoc=window.location.href.split('.com/').pop().split('/');
  if(typeof curLoc[3]!=='undefined'){if(curLoc[3].charAt(0)!=='#'){hook()}}
  if(curLoc[0]==='list'){hook()}
})();