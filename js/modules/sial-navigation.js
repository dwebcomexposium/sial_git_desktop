/**!
	Corporate Navigation
	Dropdown menu & Mega menu navigation

	@contributors: GC, GF, RR
	@date-created: 2015-04-01
	@last-update: 2015-10-15
 */

var sialNavigation = {
	bannerHeight : 120,
	$banner : null,
	$bannerSticky : false,
};
var $window = $(window);

function sialScrollSticky() {

	if ($window.scrollTop() > sialNavigation.bannerHeight) {
		if(sialNavigation.$bannerSticky === false) {
			sialNavigation.$bannerSticky = sialNavigation.$banner.clone(true,true);
			sialNavigation.$bannerSticky.addClass('is-stuck').insertBefore(sialNavigation.$banner).hide().slideDown('fast');
		}
		// iPad fix
		if ($('body.front').length === 0 && /iP(ad|hone|od)/.test(navigator.userAgent)){
			sialNavigation.$banner.find('.header-intro').hide().show(0);
		}
	} else { // Slide up nav if scroll at the top
		if(sialNavigation.$bannerSticky !== false) {
			sialNavigation.$bannerSticky.slideUp('fast', function() {
				$(this).remove();
			});
			sialNavigation.$bannerSticky = false;
		}
	}
}

function sialNavigationInit() {

	var $menu = $('.mn-menu'),
		$submenus = $menu.find('.mn-item-has-megamenu, .mn-item-has-submenu'),
		speed = 300,
		menuInitPos = $('#main').offset(),
		scrolltimer,
		resizetimer;

	if(sialNavigation.$bannerSticky) sialNavigation.$bannerSticky.remove();
	sialNavigation.$bannerSticky = false;
	sialNavigation.$banner = $('.mn-menu-line').closest('.site-banner');

	// Actions on mouse interactions
	$submenus.off('click.megamenu focus.megamenu', ' > .mn-link');
	$submenus.on('click.megamenu focus.megamenu', ' > .mn-link' ,function(e) {
		e.preventDefault();
		e.stopPropagation();
		$submenus.removeClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().slideUp(speed);
		$(this).closest('.mn-item-has-submenu').addClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().slideDown(speed);
	});

	$('body').off('click.megamenu').on('click.megamenu', function(e) {
		$submenus.removeClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().slideUp(speed);
	});

	$submenus.find('a:last').off('blur.megamenu').on('blur.megamenu', function() {
		$('body').trigger('click'); // To hide...
	});

	// Actions on mouse interactions (nav-alternate)
	if ($('body').hasClass('nav-alternate')) {

		$submenus.off('click.megamenu').on('click.megamenu', function(e){
			$('body').trigger('click');
			if(!$(this).hasClass('is-open')) $(this).addClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().fadeIn(speed);
			else if($(this).hasClass('is-open')) $(this).removeClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().fadeOut(speed);
			e.stopPropagation();
			e.preventDefault();
		});

		$submenus.off('mouseenter.megamenu focus.megamenu').on('mouseenter.megamenu focus.megamenu', function(e){
			if(!$(this).hasClass('is-open')) $(this).addClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().fadeIn(speed);
			e.stopPropagation();
		})
		.off('mouseleave.megamenu blur.megamenu').on('mouseleave.megamenu blur.megamenu', function(e){
			if($(this).hasClass('is-open')) $(this).removeClass('is-open').find('> .mn-sub-menu-mega, > .mn-menu-submenu').stop().fadeOut(speed);
			e.stopPropagation();
		});

	}

	// Sticky things on scroll
	$window.on('scroll.megamenu mousewheel.megamenu DOMMouseScroll.megamenu MozMousePixelScroll.megamenu').on('scroll.megamenu mousewheel.megamenu DOMMouseScroll.megamenu MozMousePixelScroll.megamenu', { mousewheel: { behavior: 'debounce', delay: 500 } }, function(e) {
		clearTimeout(scrolltimer);
		scrolltimer = setTimeout(sialScrollSticky);
	});
	sialScrollSticky();

	// On resize
	$window.resize(function(e) {
		clearTimeout(scrolltimer);
		clearTimeout(resizetimer);
		resizetimer = setTimeout(function(){
			$('body.body-corpo .site-banner > .inside > .header-intro').outerHeight($window.height());
		});
	});
	$window.triggerHandler('resize');

	// If navigation is not alternate, enable off-canvas
	if(!$('body').hasClass('nav-alternate')){
		$('.ac-offcanvas-trigger:not(.off-canvas-enabled)').addClass('off-canvas-enabled').acOffCanvas();
	}

}

;(function($) {

	// Initialize (or re-initialize) navigation
	sialNavigationInit();

})(jQuery);
