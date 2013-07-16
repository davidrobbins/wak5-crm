
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsButton = getHtmlId('leadsButton'),
		contactsButton = getHtmlId('contactsButton'),
		accountsButton = getHtmlId('accountsButton'),
		signedInComponent = getHtmlId('signedInComponent'),
		recentItemsBodyContainer = getHtmlId('recentItemsBodyContainer'),
		mainMenubarContainer = getHtmlId('mainMenubarContainer');
		
	WAK5CRMUTIL.mainMenubarObj = new WAK5CRMUTIL.MetroRadioMenuBar(mainMenubarContainer);		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'dashboard';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		function handleMainMenuBarSelect(ev) {
			if (!ev.options) {
				ev.options = {view: "list"};
			}
			
		  	switch(ev.buttonElemId) {
	   			case leadsButton :
				$$(signedInComponent).loadComponent({path: '/components/leads.waComponent', userData: {view: ev.options.view}});
				break;
				
				case contactsButton :
				$$(signedInComponent).loadComponent({path: '/components/contacts.waComponent', userData: {view: ev.options.view}});
				break;
				
				case accountsButton :
				$$(signedInComponent).loadComponent({path: '/components/accounts.waComponent', userData: {view: ev.options.view}});
				break;	
	   		} //end - switch
		} //end - function handleMainMenuBarSelect
		
		WAK5CRMUTIL.mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(1, {view: "list"});
		WAK5CRMUTIL.loadRecentItems(recentItemsBodyContainer);
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
