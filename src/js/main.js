$(document).ready(initPage);
function initPage(){
	ImgTobg();
	//mobileMenu();
	pageScrollTop();
	dropdownToggle();
	customSelect();

	totalPrice();
}

function ImgTobg() {
	$('.img-to-bg').each(function() {
		if ($(this).find('.img-to-bg__image').length) {
			$(this).css('background-image', 'url(' + $(this).find('> img').attr('src') + ')');
		}
	});
}

function mobileMenu(){
	$('<span class="open-menu"><span></span><span></span><span></span><span></span></span>').appendTo('.header-page > .container');
	$('<span class="fader"/>').appendTo('.header-page > .container');
	$('html').on('click', '.open-menu', function() {
		$('body').toggleClass('menu-opened');
		return false;
	});
	$('.fader').on('click touchmove', function(event) {
		$('body').removeClass('menu-opened');
	});
}

function pageScrollTop() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.btn-page-up').fadeIn();
		} else {
			$('.btn-page-up').fadeOut();
		}
	});
	$('.btn-page-up').click(function(e){
		var offsetTop = $('body').offset().top;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});
}

function dropdownToggle(){
	$('.dropdown-block__toggle').click(function(event) {
		event.preventDefault();
		$(this).parent().toggleClass('open');
	});
	$(document).on('mouseup touchend ',function (e){
		var container = $('.dropdown-block');
		if ($(window).width() >= 992) {
			if (!container.is(e.target) && container.has(e.target).length === 0){
				container.removeClass('open');
			}
		}
	});
}

function customSelect(){
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: false,
	});

	jcf.replaceAll();
}


function varsTotalPrice(){
	var val = $(".hero__form select option:selected").val();
	var sumOne = parseFloat( $('.navigation .sum-one').text() );
	var allPrice = val*sumOne;
	$('.navigation .sum').text(allPrice.toFixed(1));
	$('.navigation .previous-sum').text(allPrice.toFixed(1));
	$('.navigation .sum-one-def').text(sumOne);
	var discount = parseInt( $('.radio .sum-discount').text() );
	var sumDiscount = parseFloat( allPrice/100*discount);
	var totalPrise = allPrice - sumDiscount;
	$('.navigation .total-sum').text(totalPrise.toFixed(1));
}(varsTotalPrice())


function totalPrice(){

	$('.hero__form select').on('change', function() {
		varsTotalPrice();
	});

	$('.hero__form .radio').click(function() {
		$('.hero__form .radio.active').removeClass('active');
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active');
		}
		var	radio = $('.hero__form .radio.active').attr('data-name');
		$('.hero__form .navigation').each(function(){
			var nav = $(this).attr('data-name');
			if ( nav == radio ){
				$('.hero__form .navigation').removeClass('active');
				$(this).addClass('active');
			}
		});

	});


}
