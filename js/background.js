chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(null, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.pageStateMatcher({
					hostContains: 'wikipedia.org',
					pathContains: 'wiki'
				})
			],

			actions: [
				new chrome.declarativeContent.showPageAction()
			]
		}]);
	})
});

chrome.pageAction.onClicked.addListener(function( tab ) {
	chrome.runtime.sendMessage({disable: true});
});