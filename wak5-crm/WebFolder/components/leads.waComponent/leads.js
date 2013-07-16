
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var tabView2 = getHtmlId('tabView2'),
		firstNameInputfield = getHtmlId('firstNameInputfield');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock
	
	//console.log($comp.sourcesVar);
	
	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(tabView2).selectTab(2);
				//$$(accountsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
			} else {
				$$(tabView2).selectTab(1);
			}
		}, 40);
		
		$comp.sourcesVar.leadTypeArr = [];
		$comp.sourcesVar.leadTypeArr.push({title: 'Open Leads'});
		$comp.sourcesVar.leadTypeArr.push({title: 'Converted Leads'});
		$comp.sources.leadTypeArr.sync();
		
		console.log($comp.sourcesVar.leadTypeArr);
		
	// @region namespaceDeclaration// @startlock
	var leadTypeArrEvent = {};	// @dataSource
	var submitConvertLeadButton = {};	// @button
	var convertLeadButton = {};	// @button
	var leadNewButton = {};	// @button
	var leadSaveButton = {};	// @button
	var leadCancelButton = {};	// @button
	var convertLeadCancelButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	leadTypeArrEvent.onCurrentElementChange = function leadTypeArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		//console.log(event.dataSource.title);
		switch(event.dataSource.title) {
			case "Converted Leads":
			waf.sources.lead.query("converted == true");
			break;
			
			case "Open Leads":
			waf.sources.lead.query("converted == false");
			break;
		}

	};// @lock

	submitConvertLeadButton.click = function submitConvertLeadButton_click (event)// @startlock
	{// @endlock
		//$$(tabView2).selectTab(1);
		waf.sources.lead.convertLead({
			onSuccess: function(event) {
				WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer', event.result.recentItemArray); // Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
				waf.sources.account.all();
				waf.sources.contact.all({
					onSuccess: function(evContact) {
						waf.sources.contact.selectByKey(event.result.contactID);
						WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(2, {view: "detail"});
						//$$('bodyComponent').loadComponent({path: '/contacts.waComponent', userData: {view: "detail"}});
					}
				});
				waf.sources.lead.query("converted == false", {
					onSuccess: function(evLead) {
						//$$(id + "_tabView2").selectTab(1);
					} //onSuccess
				});
			} //end - onSuccess.
		});//end - convertLead().
	};// @lock

	convertLeadButton.click = function convertLeadButton_click (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(3);
	};// @lock

	leadNewButton.click = function leadNewButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess: function(event) {
				$$(tabView2).selectTab(2);
				$$(firstNameInputfield).focus();
				//$$(leadsTitle).setValue("Lead Information");
			}
		});
	};// @lock

	leadSaveButton.click = function leadSaveButton_click (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(1);
		waf.sources.lead.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.newRecentItem("leads", "Lead: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
	};// @lock

	leadCancelButton.click = function leadCancelButton_click (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(1);
	};// @lock

	convertLeadCancelButton.click = function convertLeadCancelButton_click (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(2);
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(2);
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_leadTypeArr", "onCurrentElementChange", leadTypeArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_submitConvertLeadButton", "click", submitConvertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadButton", "click", convertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_leadNewButton", "click", leadNewButton.click, "WAF");
	WAF.addListener(this.id + "_leadSaveButton", "click", leadSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadCancelButton", "click", leadCancelButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadCancelButton", "click", convertLeadCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
