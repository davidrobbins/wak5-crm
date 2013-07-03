
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsButton = getHtmlId('leadsButton'),
		contactsButton = getHtmlId('contactsButton'),
		signedInComponent = getHtmlId('signedInComponent'),
		optionsObject = {leadsButton: leadsButton,contactsButton: contactsButton, signedInComponent: signedInComponent};
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'dashboard';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		WAK5CRMUTIL.createMainMenubarEventHandler(optionsObject);
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
