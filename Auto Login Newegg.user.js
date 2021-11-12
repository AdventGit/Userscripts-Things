//==UserScript==
//@name        Auto Login Newegg
//@namespace   AdventShit
//@version     1.0
//@description Logs into Newegg with provided details.
//@author      Advent
//@match       *://secure.newegg.com/identity/signin*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Auto%20Login%20Newegg.user.js
//==/UserScript==
/*Set Your Details Below*/
const email='';
const pass='';
/*No Touch Below*/
const ev=document.createEvent('HTMLEvents');
ev.initEvent('input',true,true);
function submit(obj,input){
  $(obj).val(input).attr('value',input);
  $(obj)[0].dispatchEvent(ev);
  $(obj.split('>')[0]+'>form[method="post"]>div.form-cells>div.form-cell>button#signInSubmit[name="signIn"][type="submit"]').click();
  return true;
}
(()=>{
  'use strict';
  if(email!==''&&pass!==''){
    setTimeout(()=>{
      submit('div.signin-step-1>form[method="post"]>div.form-cells>div.form-cell>div.form-input>input[type="email"][autocomplete="username"]',email);
      setTimeout(()=>{submit('div.signin-step-2>form[method="post"]>div.form-cells>div.form-cell>div.form-input>input[type="password"][autocomplete="current-password"]',pass)},2500);
    },1500);
  }
})();