$(document).ready(initPage);
function initPage(){
	ImgTobg();
	//mobileMenu();
	pageScrollTop();
	dropdownToggle();
	customSelect();
	tabs();
	totalPrice();
}

function ImgTobg() {
	$('.img-to-bg').each(function() {
		if ($(this).find('img').length) {
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

function tabs(){
	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});
}


function varsTotalPrice(){
	var val = $(".hero__form select option:selected").val();
	var sumOne = parseFloat( $('.navigation .sum-one').text() );
	var allPrice = val*sumOne;
	$('.navigation .sum').text(allPrice.toFixed(2)).addClass('total');
	$('.navigation .previous-sum').text(allPrice.toFixed(2));
	var discount = parseInt( $('.radio .sum-discount').text() );
	var sumDiscount = parseFloat( allPrice/100*discount);
	var totalPrise = allPrice - sumDiscount;
	if ( $(".hero__form .radio.active").find('.sum-discount').length >= 1 ){
		$('.navigation .sum.total').text(totalPrise.toFixed(2));
	}
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
		if ( $('.hero__form .radio.active').find('.sum-discount').length >= 1 ) {
			$('.hero__form .navigation').addClass('navigation_discount');
			if ( $('.price__item').find('.price__descr').length == 0 ){
				$(' <p class="price__descr">billed monthly</p>').appendTo('.price__item');
			}
			$('.btn__container').find('.btn').remove();
			$('.btn__container').find('.btn').remove();
			$('<button type="submit" class="btn btn_lg btn_w100 btn__info">Subscribe</button>').appendTo('.btn__container');
		} else {
			$('.hero__form .navigation').removeClass('navigation_discount');
			$('.price__item').find('.price__descr').remove();
			$('.btn__container').find('.btn').remove();
			$('<button type="submit" class="btn btn_lg btn_w100 btn__info">Add to cart</button>').appendTo('.btn__container');
		}
		varsTotalPrice();
		/*var radio = $('.hero__form .radio.active').attr('data-name');
		$('.hero__form .navigation').each(function(){
			var nav = $(this).attr('data-name');
			if ( nav == radio ){
				$('.hero__form .navigation').removeClass('active');
				$(this).addClass('active');
			}
		});*/
	});


}
