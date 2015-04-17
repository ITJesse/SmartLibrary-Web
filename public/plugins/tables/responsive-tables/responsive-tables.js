$(document).ready(function() {
	var customScroll = true;//make false to use native scroll
    var tables = $('.table');
    tables.each(function( index ) {
        $(this).wrap('<div class="responsive" />');
        if(customScroll) {
        	$("div.responsive").niceScroll({
				cursoropacitymax: 0.7,
				cursorborderradius: 6,
				cursorwidth: "4px"
			});
        }
    });
});
