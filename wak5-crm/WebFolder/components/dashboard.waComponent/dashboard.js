
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsButton = getHtmlId('leadsButton'),
		contactsButton = getHtmlId('contactsButton'),
		accountsButton = getHtmlId('accountsButton'),
		signedInComponent = getHtmlId('signedInComponent'),
		mainMenubarContainer = getHtmlId('mainMenubarContainer'),
		mainMenubarObj = new WAK5CRMUTIL.MetroRadioMenuBar(mainMenubarContainer);
			
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'dashboard';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		function handleMainMenuBarSelect(ev) {
		  switch(ev.buttonElemId) {
	   			case leadsButton :
				$$(signedInComponent).loadComponent('/components/leads.waComponent');
				break;
				
				case contactsButton :
				$$(signedInComponent).loadComponent('/components/contacts.waComponent');
				break;
				
				case accountsButton :
				$$(signedInComponent).loadComponent('/components/accounts.waComponent');
				break;	
	   		} //end - switch
		} //end - function handleMainMenuBarSelect
		
		mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		mainMenubarObj.setSelectedMenuItem(1);
				
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
