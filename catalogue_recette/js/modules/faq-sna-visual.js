/*
 Summary Not Accordeon
 Permet de mettre en place un menu qui scroll à l'élement et ouvre le premier item,
 Permet aussi de gérer les dépliages/repliages

 classes utilisée:
 .js-sna-menu
 .js-sna-item-container
 .js-sna-item-dist-container
 .js-sna-item-dist-link when link and content aren't
 .js-sna-item
 .js-sna-item-link
 .js-sna-item-link-list

 .js-sna-item-content


 @contributors:  Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-21
 @last-update: 2015-11-25
 */
;
(function ($) {

//ScrollTo

// Bind click handler to menu items
	// so we can get a fancy scroll animation
	$('.js-sna-menu a').on('click', function (e) {
		e.preventDefault();
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - 20;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 300);

		if ($(href).find('.js-sna-item-dist-container').length > 0) {
			$(href).find('.js-sna-item-dist-link').first().trigger('click');
		}
	});


	if ($('.js-sna-item-dist-link').length > 0) {
		//reset container
		function resetContainer($container) {
			$container.removeClass('item-is-open');
			$container.find('.js-sna-item-content').removeClass('is-open');
			$('.is-active', $container).removeClass('is-active');

		}
		$('.js-sna-item-content-btn').on('click', function () {
			$container = $(this).closest('.js-sna-item-dist-container');
			resetContainer($container);
		});
		$('.js-sna-item-link').css('cursor','text');
		$('.js-sna-item-link').on('click', function(e){
			e.preventDefault();
			return false;
		});
		$('.js-sna-item-dist-link').on('click', function (e) {
			e.preventDefault(); //stop ebulition and the default action
			// get the container
			var $container = $(this).closest('.js-sna-item-dist-container');
			// define as open the container for CSS
			if (!$container.hasClass('item-is-open')) {
				$container.addClass('item-is-open');
			}

			// reset all active links in the container and active the current
			$('.is-active', $container).removeClass('is-active');
			$(this).addClass('is-active');
			//get index of link for open the good .js-sna-item-content in .is-open
			var indexElem = $(this).closest('.js-sna-item').index();

			var $elems = $container.find('.js-sna-item-container');
			$elems.find('> :not(:eq('+indexElem+') )').removeClass('is-open');
			$elems.find('> :eq('+indexElem+')').addClass('is-open');
			//bind the cross button with reset container


		});
	}




})(jQuery);
