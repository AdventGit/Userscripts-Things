//==UserScript==
//@name        Amazon - Remove Low Reviews/High Rating Items
//@namespace   AdventShit
//@version     1.2
//@description Removes Amazon products with a high rating but low amount of reviews.
//@author      Advent
//@match       *://amazon.com/*
//@match       *://www.amazon.com/*
//@grant       none
//@require     https://code.jquery.com/jquery-latest.min.js
//==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    return true;
}
function buttonClass() {
	return 'custom-RLR-button';
};
function buttonjQuery() {
	return 'button.'+buttonClass();
};
function reviewsEle() {
	return 'div.s-result-list > div.sg-col-4-of-24 > div.sg-col-inner > span.celwidget > div.s-expand-height > div.a-section > div.sg-row > div.sg-col-4-of-24:nth-of-type(3) > div.sg-col-inner';
};
function buttonHTML() {
    return '<input type="number" class="custom-RLR-input" min="0" max="9999" step="1" value="100" style="width:42px;"></input><button class="'+buttonClass()+'" style="width:119px;">Remove Low Reviews</button>';
};
function removeLowReviews(ctx) {
	return $(ctx).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent();
};
function removeNoReviews(ctx) {
	return $(ctx).parent().parent().parent().parent().parent().parent().parent();
};
function reviewHider() {
	$('div.a-section.a-spacing-small.a-spacing-top-small.a-text-right > span').css('display','flex').css('float','right').prepend(buttonHTML());
	$(buttonjQuery()).on('click', function() {
		if ($(buttonjQuery()+'.clicked').length !== 0) {
			$(buttonjQuery()).removeClass('clicked').text('Remove Low Reviews');
			$('div.s-result-list.s-search-results.sg-row > div a.a-link-normal span.a-size-base').each(function() {
				if (removeLowReviews(this).hasClass('to-nuke')) {
					removeLowReviews(this).removeClass('to-nuke');
				}
			});
			$(reviewsEle()).each(function() {
				if (removeNoReviews(this).hasClass('to-nuke')) {
					removeNoReviews(this).removeClass('to-nuke');
				}
			});
			$('input.custom-RLR-input').prop('disabled',false);
			$('input.custom-RLR-input').css('color','');
		} else {
			$(buttonjQuery()).addClass('clicked').text('Recover Low Reviews');
			$('div.s-result-list.s-search-results.sg-row > div a.a-link-normal span.a-size-base').each(function() {
				if (parseInt(String($(this).text()).replace(',','')) < parseInt($('input.custom-RLR-input').val())) {
					removeLowReviews(this).addClass('to-nuke');
				}
			});
			$(reviewsEle()).each(function() {
				if ($('div.a-spacing-top-micro',this).length === 0) {
					removeNoReviews(this).addClass('to-nuke');
				}
			});
			$('input.custom-RLR-input').prop('disabled',true);
			$('input.custom-RLR-input').css({'cssText':customStyles()+'color:#777777!important'});
		}
	});
	$(buttonjQuery()).click();
};

function whenReady() {
	if ($('div.a-section.a-spacing-small.a-spacing-top-small.a-text-right').length !== 0) {
		//$('div.s-result-list div.sg-col-20-of-24').remove();
		$('div.s-result-list .AdHolder').remove();
        addGlobalStyle(`.to-nuke,
input.custom-RLR-input::-webkit-outer-spin-button,
input.custom-RLR-input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
	-webkit-box-direction: unset !important;
	-webkit-box-orient: unset !important;
	-webkit-box-pack: unset !important;
	-moz-box-direction: unset !important;
	-moz-box-orient: unset !important;
	-moz-box-pack: unset !important;
	-ms-box-direction: unset !important;
	-ms-box-orient: unset !important;
	-ms-box-pack: unset !important;
	animation: unset !important;
	background: transparent !important;
	border-radius: 0px !important;
	border: none !important;
	bottom: unset !important;
	box-shadow: none !important;
	box-sizing: unset !important;
	color: unset !important;
	cursor: unset !important;
	display: none !important;
	flex-direction: unset !important;
	flex-wrap: unset !important;
	font-size: 0px !important;
	height: 0px !important;
	justify-content: unset !important;
	left: unset !important;
	letter-spacing: 0px !important;
	line-height: 0px !important;
	margin: 0px !important;
	opacity: 0 !important;
	outline: unset !important;
	overflow: unset !important;
	padding: 0px !important;
	pointer-events: unset !important;
	position: absolute !important;
	right: unset !important;
	text-align: unset !important;
	text-transform: unset !important;
	top: unset !important;
	transform: unset !important;
	transition: unset !important;
	vertical-align: unset !important;
	visibility: hidden !important;
	width: 0px !important;
	z-index: -99999 !important;
}
input.custom-RLR-input {
    -moz-appearance: textfield !important;
}
input.custom-RLR-input,
button.custom-RLR-button {
    height: 22px !important;
    font-size: 11px !important;
    line-height: 19px !important;
    padding: 0px 5px 0px 5px !important;
    background: #e7e9ec !important;
    border-radius: 3px !important;
    border-color: #ADB1B8 #A2A6AC #8D9096 !important;
    border-style: solid !important;
    border-width: 1px !important;
    cursor: pointer !important;
    text-align: center !important;
    text-decoration: none !important;
    vertical-align: middle !important;
    margin: 0px 4px 0px 0px !important;
}`)
		reviewHider();
	}
};

(function() {
    'use strict';
    whenReady();
})();