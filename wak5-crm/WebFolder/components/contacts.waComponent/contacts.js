
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var	firstNameInputfield = getHtmlId('firstNameInputfield'),
		contactsListContainer = getHtmlId('contactsListContainer'),
		contactsDetailContainer = getHtmlId('contactsDetailContainer'),
		contactsDetailMainContainer = getHtmlId('contactsDetailMainContainer'),
		contactsActivityDetailContainer = getHtmlId('contactsActivityDetailContainer');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//$$(activitySmallComponent).loadComponent({path: '/components/smallActivity.waComponent', userData: {view: "contact"}});
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("contact.ID = :1", waf.sources.contact.getCurrentElement().ID.getValue());
				$$(contactsListContainer).hide();
				$$(contactsDetailContainer).show();
			} else {
				$$(contactsDetailContainer).hide();
				$$(contactsListContainer).show();
			}
		}, 80);

	// @region namespaceDeclaration// @startlock
	var contactSaveActivityButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var newContactTaskButton = {};	// @button
	var newContactButton = {};	// @button
	var contactsSaveButton = {};	// @button
	var contactsCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	contactSaveActivityButton.click = function contactSaveActivityButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Activity for contact: " + waf.sources.contact.firstName + " " + waf.sources.contact.lastName + " has been saved to the server.", 5000, "normal");
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
		$$(contactsActivityDetailContainer).hide();
		$$(contactsDetailMainContainer).show();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		//Activity Grid.
		$$(contactsDetailMainContainer).hide();
		$$(contactsActivityDetailContainer).show();
	};// @lock

	newContactTaskButton.click = function newContactTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.contact.set(waf.sources.contact);
				$$(contactsDetailMainContainer).hide();
				$$(contactsActivityDetailContainer).show();
			}
		});
	};// @lock

	newContactButton.click = function newContactButton_click (event)// @startlock
	{// @endlock
		waf.sources.contact.addNewElement();
		waf.sources.contact.serverRefresh({
			onSuccess: function(event) {
				$$(contactsListContainer).hide();
				$$(contactsDetailContainer).show();
				$$(firstNameInputfield).focus();
			}
		});
	};// @lock

	contactsSaveButton.click = function contactsSaveButton_click (event)// @startlock
	{// @endlock
		
		$$(contactsDetailContainer).hide();
		$$(contactsListContainer).show();
	
		waf.sources.contact.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Contact: " + event.dataSource.firstName + " " + event.dataSource.lastName + " has been saved to the server.", 5000, "normal");
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
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", waf.sources.contact.firstName + " " + waf.sources.contact.lastName, waf.sources.contact.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_contactSaveActivityButton", "click", contactSaveActivityButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newContactTaskButton", "click", newContactTaskButton.click, "WAF");
	WAF.addListener(this.id + "_newContactButton", "click", newContactButton.click, "WAF");
	WAF.addListener(this.id + "_contactsSaveButton", "click", contactsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_contactsCancelButton", "click", contactsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
