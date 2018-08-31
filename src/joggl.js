jQuery(document).ready(function ($) {
	// Insert the button elements
	function prependButtons() {
		$(".ListItem__item:not(.joggled)").each(function () {
			if ($(this).find('.joggl').length == 0) {
				$(this).addClass('joggled');
				$(this).prepend('<div class="ContextMenu__container joggl"><img src="' + browser.extension.getURL("assets/images/joggl.png") + '" class="joggl-button"/></div>');
			}
		});
	}
    setInterval(prependButtons, 1000);

	$('.joggl-button').click(function () {
		console.log('clicked');
	});
});
