jQuery(document).ready(function ($) {
    function openPopup(e, id) {
        console.log(id);
	};

	// Insert the button elements
	function prependButtons() {
		$(".ListItem__item:not(.joggled)").each(function () {
			if ($(this).find('.joggl').length == 0) {
			    var id = null;
			    try {
                    id = $(this).find('.css-ly1zji0')[0].innerText.split(' ')[0];
                    $(this).addClass('joggled');
                    $(this).prepend('<div class="ContextMenu__container joggl" id="' + id + '"><img src="' +
						browser.extension.getURL("assets/images/joggl.png") + '" class="joggl-button"/></div>');
                    document.getElementById(id).addEventListener('click', function (e) {
                    	openPopup($(e.srcElement.parentElement.parentElement)[0], id);
                    });
				} catch (e) {

				}
			}
		});
	};
    setInterval(prependButtons, 1000);
});
