
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var	firstNameInputfield = getHtmlId('firstNameInputfield'),
		contactsListContainer = getHtmlId('contactsListContainer'),
		contactsDetailContainer = getHtmlId('contactsDetailContainer');
		
		 //tabView1 = getHtmlId('tabView1'),
		//accordion1 = getHtmlId('accordion1'),
		//activitySmallComponent = getHtmlId('activitySmallComponent'),
		//contactTitle = getHtmlId('contactTitle');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//$$(activitySmallComponent).loadComponent({path: '/components/smallActivity.waComponent', userData: {view: "contact"}});
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				//$$(tabView1).selectTab(2);
			} else {
				//$$(tabView1).selectTab(1);
			}
		}, 80);
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("contact.ID = :1", waf.sources.contact.getCurrentElement().ID.getValue());
				//$$(contactTitle).setValue("Contact Information: " + waf.sources.contact.fullName);
			} 
		}, 400);

	// @region namespaceDeclaration// @startlock
	var newContactButton = {};	// @button
	var contactsSaveButton = {};	// @button
	var contactsCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newContactButton.click = function newContactButton_click (event)// @startlock
	{// @endlock
		waf.sources.contact.addNewElement();
		waf.sources.contact.serverRefresh({
			onSuccess: function(event) {
				//$$(tabView1).selectTab(2);
				
				$$(contactsListContainer).hide();
				$$(contactsDetailContainer).show();
				$$(firstNameInputfield).focus();
				//$$(contactTitle).setValue("New Contact");
			}
		});
	};// @lock

	contactsSaveButton.click = function contactsSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.contact.save({
			onSuccess: function(event) {
				$$(contactsDetailContainer).hide();
				$$(contactsListContainer).show();
				
				WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		//$$(tabView1).selectTab(1);
		//Bug report: isNewElement(). The following line is only work-around.
		//waf.sources.contact.collectionRefresh(); BAD BAD

	};// @lock

	contactsCancelButton.click = function contactsCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.contact.isNewElement()) {
			waf.sources.contact.removeCurrentReference();
		}
		
		$$(contactsDetailContainer).hide();
		$$(contactsListContainer).show();
		
		

		//$$(tabView1).selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		waf.sources.activity.query("contact.ID = :1", waf.sources.contact.getCurrentElement().ID.getValue());
		
		$$(contactsListContainer).hide();
		$$(contactsDetailContainer).show();
		
	
	
		
		//$$(contactTitle).setValue("Contact Information: " + waf.sources.contact.fullName);
		//$$(accordion1).expand(1);
		//$$(tabView1).selectTab(2);
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", waf.sources.contact.firstName + " " + waf.sources.contact.lastName, waf.sources.contact.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newContactButton", "click", newContactButton.click, "WAF");
	WAF.addListener(this.id + "_contactsSaveButton", "click", contactsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_contactsCancelButton", "click", contactsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
