//==UserScript==
//@name        PCPartPicker Alphabetical Overwrite List
//@namespace   AdventShit
//@version     1.2
//@description Sorts saved lists alphabetically when saving over.
//@author      Advent
//@match       *://pcpartpicker.com/list*
//@match       *://pcpartpicker.com/user/*/saved*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/PCPartPicker%20Alphabetical%20Overwrite%20List.user.js
//==/UserScript==
function mutAction(){
  const baseTarget=$('select#partlist_save_existing_choice');
  const target=$('>option',baseTarget);
  var alphaSorted=[];
  target.each(()=>{
    const onCur=$(this);
    this.text=this.text.split('Saved Part List - ').pop();
    onCur.attr('name',this.text);
    alphaSorted.push(onCur.attr('name'));
  });
  alphaSorted.sort();
  target.each(function(i){$('>option[name="'+alphaSorted[i]+'"]',baseTarget).appendTo(baseTarget)});
}
function hook(){new MutationObserver(function(m){m.forEach(()=>{mutAction()})}).observe($('ul#partlist_save_dialog_overwrite_choices').get(0),{childList:true,subtree:false})}
(()=>{
  'use strict';
  const curLoc=window.location.href.split('.com/').pop().split('/');
  const secondLoc=curLoc[3];
  if(typeof secondLoc!=='undefined'){if(!(secondLoc===''||secondLoc.charAt(0)==='#')){hook()}}
  if(curLoc[0]==='list'){hook()}
})();