
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var welcomeMessageRichText = getHtmlId('welcomeMessageRichText');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$$(welcomeMessageRichText).setValue("Welcome " + waf.directory.currentUser().fullName);
		waf.sources.activity.query("status !== :1", "Completed");
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
