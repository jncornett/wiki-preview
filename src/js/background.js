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

var callback,
	rule = {
	conditions: [
		new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {
				hostContains: 'wikipedia.org',
				pathContains: 'wiki'
			}
		})
	],

	actions: [
		new chrome.declarativeContent.ShowPageAction()
	]
};

callback = function() {
	var tooltipDisabled = false;

	chrome.pageAction.onClicked.addListener(function() {
		console.log('pageAction.onClicked');
		chrome.tabs.query({active: true, currentWindow: true}, function( tabs ) {
			tooltipDisabled = !tooltipDisabled;
			chrome.tabs.sendMessage(tabs[0].id, {disabled: tooltipDisabled});
			chrome.pageAction.setIcon({
				path: 'images/' + (tooltipDisabled? 'eye_closed.png': 'eye_open.png'),
				tabId: tabs[0].id
			});
		});
	});
};

chrome.runtime.onInstalled.addListener(function() {
	console.log('onInstalled');
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		console.log('onPageChanged.removeRules');
		chrome.declarativeContent.onPageChanged.addRules([rule], callback);
	});
});