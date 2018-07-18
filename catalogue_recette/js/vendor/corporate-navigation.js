/**!
	Corporate Navigation
	Dropdown menu & Mega menu navigation

	@contributors: Geoffrey Crofte (Alsacréations)
	@date-created: 2015-04-01
	@last-update: 2015-05-28
 */

;(function($) {

	var $menuline = $('.mn-menu-line'),
		$menu = $('.mn-menu'),
		$submenus = $menu.find('.mn-item-has-megamenu, .mn-item-has-submenu'),
		speed = 175,
		menuInitPos = $menuline.offset(),
		scrolltimer;

	// actions on mouse interactions
	$submenus.on('mouseenter.megamenu', function(e){
			$(this).addClass('is-open')
				.find('> .mn-sub-menu-mega, > .mn-sub-menu').stop().fadeIn(speed);
		})
		.on('mouseleave.megamenu', function(e){
			$(this).removeClass('is-open')
				.find('> .mn-sub-menu-mega, > .mn-sub-menu').stop().fadeOut(speed);
		});

	// accessibility (keyboard tab nav)
	$submenus.find('> .mn-link').on('focus', function(){
		$(this).closest('.mn-menu-item').trigger('mouseenter');
	});
	$submenus.find('a:last').on('blur', function(){
		$(this).closest('.mn-item-lvl-1').trigger('mouseleave');
	});

	// sticky things on scroll
	window.addEventListener('scroll', function(){
		clearTimeout(scrolltimer);
		scrolltimer = setTimeout(function(){

			if ( $(window).scrollTop() >= menuInitPos.top) {
				$menuline.closest('.site-banner').addClass('is-stuck');
			}
			else {
				$menuline.closest('.site-banner').removeClass('is-stuck');
			}

		}, 15);
	}, true);

})(jQuery);
