
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsButton = getHtmlId('leadsButton'),
		contactsButton = getHtmlId('contactsButton'),
		accountsButton = getHtmlId('accountsButton'),
		signedInComponent = getHtmlId('signedInComponent'),
		mainMenubarContainer = getHtmlId('mainMenubarContainer'),
		mainMenubarObj = new WAK5CRMUTIL.MetroRadioMenuBar(mainMenubarContainer),
		optionsObject = {accountsButton: accountsButton, leadsButton: leadsButton,contactsButton: contactsButton, signedInComponent: signedInComponent};
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'dashboard';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		function handleMainMenuBarSelect(ev) {
		  switch(ev.buttonElemId) {
	   			case leadsButton :
				$$(optionsObject.signedInComponent).loadComponent('/components/leads.waComponent');
				break;
				
				case contactsButton :
				$$(optionsObject.signedInComponent).loadComponent('/components/contacts.waComponent');
				break;
				
				case accountsButton :
				$$(optionsObject.signedInComponent).loadComponent('/components/accounts.waComponent');
				break;	
	   		} //end - switch
		} //end - function handleMainMenuBarSelect
		
		mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		//WAK5CRMUTIL.createMainMenubarEventHandler(optionsObject);
		
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
