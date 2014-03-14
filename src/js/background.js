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