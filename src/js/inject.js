/*  This file is part of wikiPreview.

    wikiPreview is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    wikiPreview is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with wikiPreview.  If not, see <http://www.gnu.org/licenses/>. */
    
(function($, undefined) {
	var targetRegex,
		retrieveContent,
		tooltipSettings;

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
					format: 'json',
					redirects: 1
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

	tooltipSettings = {
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
	};

	$(function() {
		
		$(document).tooltip(tooltipSettings);

		chrome.runtime.onMessage.addListener(function( message ) {
			console.log(message);
			if ( message.disabled ) {
				$(document).tooltip('destroy');
			} else {
				$(document).tooltip(tooltipSettings);
			}
		});

		// Remove the native title to prevent the tooltip from
		// being displayed
		$('a[href^="/wiki/"]').removeAttr('title');

	});
	
})(jQuery);