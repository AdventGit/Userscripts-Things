//==UserScript==
//@name        Auto Login PCPartPicker
//@namespace   AdventShit
//@version     1.1
//@description Logs into PCPartPicker with provided details.
//@author      Advent
//@match       *://pcpartpicker.com/*
//@grant       none
//@downloadURL https://github.com/AdventGit/Userscripts-Things/raw/main/Auto%20Login%20PCPartPicker.user.js
//==/UserScript==
/*Set Your Details Below*/
const email='';
const pass='';
/*No Touch Below*/
const ev=document.createEvent('HTMLEvents');
ev.initEvent('input',true,true);
function submit(obj,input){
  obj.val(input).attr('value',input);
  obj[0].dispatchEvent(ev);
  return true;
}
(()=>{
  'use strict';
  const login='/accounts/login/';
  const doesExist=window.location.href.toLowerCase().includes(login);
  if(!doesExist){
    if($('ul.nav__account>li.nav__account--login').length!=0){window.location.href='https://pcpartpicker.com'+login}
  }else if(doesExist){
    if(email!==''&&pass!==''){
      setTimeout(()=>{
        const baseTarget=$('form#login_form>div.wrapper-formField');
        submit($('>input.text-input#id_username[type="text"][name^="username"][maxlength="75"][placeholder="Username or Email"]',baseTarget),email);
        submit($('>input.text-input#id_password[type="password"][name="password"][placeholder="Password"]',baseTarget),pass);
        $('>input.button.g-recaptcha[type="submit"][data-sitekey][data-callback="recaptcha_callback"][value="Sign In"]',baseTarget).click();
      },500);
    }
  }
})();