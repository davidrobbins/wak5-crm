
(function Component (id) {// @lock


function constructor (id) {
	var	firstNameInputfield = getHtmlId('firstNameInputfield'),
		contactsListContainer = getHtmlId('contactsListContainer'),
		contactsDetailContainer = getHtmlId('contactsDetailContainer'),
		contactsDetailMainContainer = getHtmlId('contactsDetailMainContainer'),
		contactsActivityDetailContainer = getHtmlId('contactsActivityDetailContainer'),
		notesComponent = getHtmlId('notesComponent'),
		activityDetailComponent = getHtmlId('activityDetailComponent'),
		combobox3$ = getHtmlObj('combobox1'),
		accordion1 = getHtmlId('accordion1');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("contact.ID = :1", waf.sources.contact.ID);
				$$(contactsListContainer).hide();
				$$(contactsDetailContainer).show();
			} else {
				$$(contactsDetailContainer).hide();
				$$(contactsListContainer).show();
			}
			
			
			//Load activity detail component.
			$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: contactsDetailMainContainer, activityDetailContainer: contactsActivityDetailContainer}});
		}, 80);

	// @region namespaceDeclaration// @startlock
	var newContactEventButton = {};	// @button
	var contactsCopyAddrButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var newContactTaskButton = {};	// @button
	var newContactButton = {};	// @button
	var contactsSaveButton = {};	// @button
	var contactsCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newContactEventButton.click = function newContactEventButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "event";
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

	contactsCopyAddrButton.click = function contactsCopyAddrButton_click (event)// @startlock
	{// @endlock
		waf.sources.contact.shippingStreet = waf.sources.contact.street;
		waf.sources.contact.shippingCity = waf.sources.contact.city;
		waf.sources.contact.shippingState = waf.sources.contact.state;
		waf.sources.contact.shippingZip = waf.sources.contact.zip;
		waf.sources.contact.shippingCountry = waf.sources.contact.country;
		waf.sources.contact.autoDispatch();
		WAK5CRMUTIL.setMessage("Address copied to Shipping Address.", 5000, "normal");
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
				//Note: Bug - Refactor - Super hack fix later.
				combobox1$.find('input').val('-none-');
				$$(contactsListContainer).hide();
				$$(contactsDetailContainer).show();
				$$(firstNameInputfield).focus();
			}
		});
	};// @lock

	contactsSaveButton.click = function contactsSaveButton_click (event)// @startlock
	{// @endlock
		$$(accordion1).expand(1);
		$$(contactsDetailContainer).hide();
		$$(contactsListContainer).show();
	
		waf.sources.contact.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Contact: " + event.dataSource.firstName + " " + event.dataSource.lastName + " has been saved to the server.", 5000, "normal");
				WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		
	};// @lock

	contactsCancelButton.click = function contactsCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.contact.isNewElement()) {
			waf.sources.contact.removeCurrentReference();
		}
		
		$$(accordion1).expand(1);
		$$(contactsDetailContainer).hide();
		$$(contactsListContainer).show();
		//$$(tabView1).selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		waf.sources.activity.query("contact.ID = :1", waf.sources.contact.ID);	
		$$(contactsListContainer).hide();
		$$(contactsDetailContainer).show();
		
		//Load Note Component
		$$(notesComponent).loadComponent({path: '/components/notes.waComponent', userData: {section: "contacts", entityID: waf.sources.contact.ID}});

		
		
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", waf.sources.contact.firstName + " " + waf.sources.contact.lastName, waf.sources.contact.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newContactEventButton", "click", newContactEventButton.click, "WAF");
	WAF.addListener(this.id + "_contactsCopyAddrButton", "click", contactsCopyAddrButton.click, "WAF");
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
