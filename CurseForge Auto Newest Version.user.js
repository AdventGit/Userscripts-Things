//==UserScript==
//@name        CurseForge Auto Newest Version
//@namespace   AdventShit
//@version     2.2
//@description Auto DLs and Defers Versions incase of version miss-match.
//@author      Advent
//@match       *://www.curseforge.com/minecraft/mc-mod*
//@match       *://www.curseforge.com/minecraft/customization*
//@match       *://www.curseforge.com/minecraft/texture-packs*
//@require     https://code.jquery.com/jquery-latest.min.js
//@grant       window.close
//@grant       window.sessionStorage
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/CurseForge%20Auto%20Newest%20Version.user.js
//==/UserScript==
/*The MC you want to DL for*/
const mcTarget='1.16.5';
const downgradeTarget='1.16.4';
/*No touch below :)*/
const ss=window.sessionStorage
const curPage=window.location.href;
const totalIndex=curPage.split('/').length;
const [prevIndex,lastIndex]=curPage.split('/').slice(-2);
const mcVers=[
  ['1.17.1','?filter-game-version=2020709689%3A8516'],
  ['1.17','?filter-game-version=1738749986%3A73242'],
  ['1.16.5','?filter-game-version=2020709689%3A8203'],
  ['1.16.4','?filter-game-version=2020709689%3A8134'],
  ['1.16.3','?filter-game-version=2020709689%3A8056'],
  ['1.14.4','?filter-game-version=2020709689%3A7469'],
  ['1.12.2','?filter-game-version=2020709689%3A6756'],
  ['1.8.9','?filter-game-version=2020709689%3A5806']
];
function retTarget(userTarget){
  var toRet=null;
  mcVers.forEach(mcVer=>{
    if(mcVer[0]===userTarget){
      toRet=mcVer[1];
      return;
    }
  });
  return(toRet);
}
function dlNewest(){
  const newestDL=$('table.listing.listing-project-file.project-file-listing>tbody>tr:first>td:last>div>a:first');
  if(newestDL.length){
    ss.removeItem('isDowngraded');
    newestDL[0].click();
    return true;
  }else{return false}
}
function loadDefered(){
  const [baseLink,onCur]=window.location.href.split('?');
  const downgradeLink=retTarget(downgradeTarget);
  if('?'+onCur!==downgradeLink){
    window.location.href=baseLink+downgradeLink;
    return true;
  }else{return false}
}
(()=>{
  'use strict';
  if(prevIndex!=="download"&&totalIndex===7||totalIndex===8){
    var checkDowngrade=ss.getItem('isDowngraded');
    if(checkDowngrade===undefined||checkDowngrade===null){
      ss.setItem('isDowngraded','false');
      checkDowngrade=ss.getItem('isDowngraded');
    }
    if(checkDowngrade){
      if(lastIndex.includes('all')){
        if(lastIndex==='all'){
          window.location.href=curPage.concat(retTarget(mcTarget))
        }else{
          if(!dlNewest()){
            ss.setItem('isDowngraded','true');
            if(!loadDefered()){location.reload()}
          }
        }
      }else if(lastIndex==='files'){window.location.href=curPage.concat('/all')}
    }else{
      if(!loadDefered()){
        if(!dlNewest()){
          ss.removeItem('isDowngraded');
          window.close();
        }
      }
    }
  }
})();