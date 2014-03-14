(function($, undefined) {
	var targetRegex,
		retrieveContent;

	targetRegex = /\/wiki\/(.*)/;

	retrieveContent = function( callback ) {
		var target = targetRegex.exec(this.href);
		if ( target ) {
			$.get(
				'/w/api.php',
				{
					exsentences: 3,
					action: 'query',
					prop: 'extracts',
					titles: target[1],
					explaintext: 1,
					exintro: 1,
					format: 'json'
				},

				function( response ) {
					var text,
						pages;
					// Try parsing some JSON :D
					try {
						pages = response.query.pages;
						for ( var pageid in pages) {
							text = pages[pageid].extract;
							break;
						}
					} catch ( e ) {}
					finally {
						callback(text || 'No content');
					}
				}
			).fail(function() {
				callback('Failed');
			});
		}

	};

	$(function() {
		
		// Remove the native title to prevent the tooltip from
		// being displayed
		$('a[href^="/wiki/"]').removeAttr('title');

		$(document).tooltip({
			tooltipClass: 'wikiPreview-tooltip',
			content: retrieveContent,
			items: 'a[href^="/wiki/"]',

			// Hotfix for tooltips getting stuck open
			// if mouseout occurs to soon after mouseover
			open: function() {
				$(this).one('mouseout.wpcustom', function() {
					$(this)
						.off('mouseout.wpcustom')
						.tooltip('disable')
						.tooltip('enable');
				});
			}
		});
	});
})(jQuery);