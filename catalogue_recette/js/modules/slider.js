/**!
 Slider
 Description du module

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-04-09
 @last-update: 2015-04-24
 */

;
(function ($, window, document, undefined) {

	// Create the defaults once
	var pluginName = 'cxpSlider',
		defaults = {
			//Options Plugin Here
		},
		defaultsSwiper = {
			// Optional parameters
			direction: 'horizontal',
			loop: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
			slideClass: "slider-item",
			speed: 700,
			autoplay: 0,
			simulateTouch: false,
			// If we need pagination
			pagination: '.slider-pagin-nb',
			paginationClickable: true,
			a11y: true,
			bulletClass: "slider-pagin-item",
			bulletActiveClass: "is-active",
			paginationHiddenClass: "",
			// Navigation arrows
			nextButton: '.slider-btn-next',
			prevButton: '.slider-btn-prev',
			buttonDisabledClass: 'slider-btn-disabled',
			// observer
			observer: true,
			observeParents: true,
			//Unused by SwiperJS but use for Change pagin
			alsaCustomPagin: 0
		};

	// The actual plugin constructor
	function cxpSlider(_caller, selector, options) {
		this._caller = _caller;
		this.selector = selector;
		this.sliders = {};
		//options override
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		//options for the plugin (can be override by the attr/data data-slider-param on container
		this._defaultsSwiper = defaultsSwiper;
		this._name = 'cxpSlider';
		this.init();
	}

	//Prototype of the object
	cxpSlider.prototype = {
		init: function () {
			var instance = this;
			var arraySlider = {};
			var sliderDefaultOpt = this._defaultsSwiper;

			$(this.selector).each(function (index) {
				var newClass = 'slider-instance-' + index;
				var sliderOptions = $.extend({}, sliderDefaultOpt, $(this).data('sliderParam'));
				//change option with more precise selector for multiple slider
				sliderOptions.nextButton = '.' + newClass + ' ' + sliderOptions.nextButton;
				sliderOptions.prevButton = '.' + newClass + ' ' + sliderOptions.prevButton;
				sliderOptions.pagination = '.' + newClass + ' ' + sliderOptions.pagination;
				//Pagination with n/N
				if (sliderOptions.alsaCustomPagin === 1) {
					sliderOptions.paginationClickable = false;
					sliderOptions.paginationHide = true;

					//console.log($(this).find('.slider-item').length);
					$(this).find('.slider-nb-total').text($(this).find('.slider-item').length);
					if (sliderOptions.slidesPerView > 1) {
						$(this).find('.slider-nb-end').text('-' + sliderOptions.slidesPerView).attr('data-nbto', sliderOptions.slidesPerView);
					} else {
						$(this).find('.slider-nb-end').text('').attr('data-nbto', sliderOptions.slidesPerView);
					}
					$(this).find('.slider-nb-start').text(1).attr('data-nbfrom', 0);


					sliderOptions.onSlideChangeEnd = function (swiper) {

						var $this_swiper = $(swiper.container),
							$from = $this_swiper.find('.slider-nb-start'),
							$from_data = $this_swiper.find('.slider-nb-start').data('nbfrom'),
							$to = $this_swiper.find('.slider-nb-end'),
							$to_data = $this_swiper.find('.slider-nb-end').data('nbto');
						//Debug DATA
//						console.log(newClass);
//						console.log('$from_data = ' + parseInt($from_data));
//						console.log('$to_data = ' + parseInt($to_data));
//						console.log('swiper.activeIndex = ' + swiper.activeIndex);
//						console.log('result = ' + (parseInt($to_data) + swiper.activeIndex + 1));


						if (swiper.activeIndex !== 0) {
							if (swiper.params.slidesPerView > 1) {
								$from.text(swiper.activeIndex + 1);
							} else {
								$from.text(swiper.activeIndex + 1);
							}
						} else {
							$from.text(swiper.activeIndex + 1);
						}
						if (swiper.params.slidesPerView > 1) {

							if (swiper.activeIndex !== 0) {
								$to.text('-' + (parseInt($to_data) + swiper.activeIndex));
							} else {
								$to.text('-' + $to_data);
							}
						}
					};
				}

				$(this).addClass(newClass);
				var tmpSlider = $(this).swiper(sliderOptions);

				// default set play/pause button for autoplay
				if (tmpSlider.params.autoplay > 0) {
					tmpSlider.container.addClass('js-autoplay-active');
					$('.slider-play-btn', tmpSlider.container).find('.icon-play').removeClass('icon-play').addClass('icon-pause');
				} else {
					$('.slider-play-btn', tmpSlider.container).find('.icon-pause').removeClass('icon-pause').addClass('icon-play');
				}
				//Bind the button play/pause
				$('.' + newClass + ' ' + '.slider-play-btn').on('click', function (e) {
					e.preventDefault();
					instance.playToggle(instance.sliders[newClass]);
				});

				tmpSlider.container.data('swiper', tmpSlider);
				arraySlider[newClass] = tmpSlider;
				//console.log(tmpSlider.container.data('swiper'));
			});
			this.sliders = arraySlider;
			return instance;
		},
		playToggle: function (slider) {
			//toggle button PLay/Pause autoplay
			if (slider.container.hasClass('js-autoplay-active')) {
				slider.stopAutoplay();
				slider.params.autoplay = 0;
				slider.container.removeClass('js-autoplay-active');
				$('.slider-play-btn', slider.container).find('.icon-pause').removeClass('icon-pause').addClass('icon-play');
			} else {
				slider.stopAutoplay();
				slider.params.autoplay = 1000;
				slider.startAutoplay();
				slider.container.addClass('js-autoplay-active');
				$('.slider-play-btn', slider.container).find('.icon-play').removeClass('icon-play').addClass('icon-pause');
			}
		},
		bindUpdateCustomPagin: function (slider) {

		},
		getSlider: function (classSlider) {
			// in case get an specifique Slider with slider-instance-N N is an integer
			return this.sliders[classSlider];
		}
	};

	// Instanciate the plugin AlsaSlider and put it in a variable
	$.fn['cxpSlider'] = function (options) {
		return this.each(function () {
			if (!$.data(this, "cxpSlider")) {
				$.data(this, "cxpSlider",
					this.cxpSlider = new cxpSlider(this, options));
			}
		});
	};

	if ($('.cxp-slider').length > 0) {
		$('body').cxpSlider('.cxp-slider');
	}

})(jQuery, window, document);
