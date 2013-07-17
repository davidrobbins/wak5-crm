
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var tabView1 = getHtmlId('tabView1'),
		firstNameInputfield = getHtmlId('firstNameInputfield');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'contacts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(tabView1).selectTab(2);
				//$$(accountsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
			} else {
				$$(tabView1).selectTab(1);
			}
		}, 40);

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
				$$(tabView1).selectTab(2);
				$$(firstNameInputfield).focus();
				//$$(leadsTitle).setValue("Lead Information");
			}
		});
	};// @lock

	contactsSaveButton.click = function contactsSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.contact.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.newRecentItem("contacts", "Contact: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		$$(tabView1).selectTab(1);
	};// @lock

	contactsCancelButton.click = function contactsCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.contacts.isNewElement()) {
			waf.sources.contacts.removeCurrentReference();
		}

		$$(tabView1).selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(2);
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
