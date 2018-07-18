/**!
 COMMONS SIAL
 All commons function merged to generics jQuery plugins

 @contributors: Guillaume Focheux (Alsacréations)
 @date-created: 2015-09-16
 @last-update: 2015-10-20
 */


// function for Copy element somewhere else
$.fn.elemCopy = function () {

	return this.each(function () {
		var $_this = $(this),
			$target = $($(this).data('copyTarget')),
			position = $(this).data('copyPosition'),
			$copy = $_this.clone();

		$copy.removeClass('js-elem-copy').removeAttr('data-copy-target').removeAttr('data-copy-position');

		if( position === 'pre'){
			$target.prepend($copy);
		} else {
			$target.append($copy);
		}

	});

};
// function to Relocate an element somewhere else
$.fn.elemRelocate = function () {

	return this.each(function () {
		var $_this = $(this),
			$target = $($(this).data('relocateTarget')),
			position = $(this).data('relocatePosition'),
			$elem = $_this.detach();

		$elem.removeClass('js-elem-relocate').removeAttr('data-relocate-target').removeAttr('data-relocate-position');

		if( position === 'before'){
			$target.prepend($elem);
		} else {
			$target.append($elem);
		}

	});

};

// add Button
if( $('.gsf-fields').length > 0){
	var textTitle= $('.gsf-fields .gsf-input').data('formTitle'),
	toAdd = '';

	//console.log($('.gsf-fields .gsf-input').data());
	if( textTitle !== undefined){
		toAdd = '<span class="gsf-fields-title">'+textTitle+'</span><span class="btn-gsf-fields-close js-to-close"><i class="icon icon-cross"></i><span class="visually-hidden">Fermer la recherche</span></span>';
	} else {
		toAdd = '<button class="btn-gsf-fields-close js-to-close"><i class="icon icon-cross"></i><span class="visually-hidden">Fermer la recherche</span></button>';
	}
	$('.gsf-fields.js-toggle-target').prepend(toAdd);
}

// Copy elem in other
if($('.js-elem-copy').length > 0){
	$('.js-elem-copy').elemCopy();
}

// Item elem in other
if($('.js-elem-relocate').length > 0){
	$('.js-elem-relocate').elemRelocate();
}
if(  $('.press-releases .link-view-all').length > 0){
	// Relocate without change in HTML press-releases
	var $pressReleaseBtn = $('.press-releases .link-view-all'),
	$pressRelease = $('.press-releases');
	$pressRelease.append( $pressReleaseBtn.detach() ) ;
}

// Scrool To "voir plus"

$('.site-banner .hi-link').on('click', function(){
	var speed = 750; // Durée de l'animation (en ms)
	// Substract 20 pixel for see the next title
	$('html, body').animate( { scrollTop: $(this).offset().top - 20 }, speed ); // Go
	return false;
});


// IE10-11 Fixed for sitkcy navigation
var navStuck = false;
function ieFixOpenOC() {
	//console.log('open');
	navStuck = $('.site-banner').hasClass('is-stuck');
	//console.log('navStuck = '+navStuck);
	if( navStuck ){
		//console.log('openStuck');
		$('.site-banner').removeClass('is-stuck');
	}
	return true;

}
function ieFixCloseOC() {
	//console.log('close');
	//console.log('navStuck = '+ navStuck);
	if( navStuck ){
		//console.log('closeStuck');
		$('.site-banner').addClass('is-stuck');
	}
	return true;
}
if ($('.ac-offcanvas-trigger').length > 0) {

	if( /MSIE 9/i.test(navigator.userAgent) ||  /MSIE 10/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) ){
		$('.ac-offcanvas-trigger').on('click', ieFixOpenOC );
		$('body').on('click','.ac-oc-overlay', ieFixCloseOC );
		$('.ac-offcanvas-close').on('click', ieFixCloseOC );
	}
}


// sf-ttt to the top
    $btnTTT = $('.sf-ttt');

$('.sf-ttt').on('click', function(){
    $("html, body").animate({
        scrollTop: 0
    }, 600);
});
