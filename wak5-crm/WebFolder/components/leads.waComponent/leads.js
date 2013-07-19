
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var tabView1 = getHtmlId('tabView1'),
		firstNameInputfield = getHtmlId('firstNameInputfield'),
		accordion1 = getHtmlId('accordion1'),
		activitySmallComponent = getHtmlId('activitySmallComponent'),
		leadsTitle = getHtmlId('leadsTitle');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$$(activitySmallComponent).loadComponent({path: '/components/smallActivity.waComponent', userData: {view: "lead"}});
		
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(leadsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
				$$(tabView1).selectTab(2);
				waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
			} else {
				$$(tabView1).selectTab(1);
			}
		}, 400);
		
		$comp.sourcesVar.leadTypeArr = [];
		$comp.sourcesVar.leadTypeArr.push({title: 'Open Leads'});
		$comp.sourcesVar.leadTypeArr.push({title: 'Converted Leads'});
		$comp.sources.leadTypeArr.sync();
					
	// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
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

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(1);
	};// @lock

	leadTypeArrEvent.onCurrentElementChange = function leadTypeArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
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
		$$(tabView1).selectTab(3);
	};// @lock

	leadNewButton.click = function leadNewButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess: function(event) {
				$$(tabView1).selectTab(2);
				$$(firstNameInputfield).focus();
				$$(leadsTitle).setValue("New Lead");
			}
		});
	};// @lock

	leadSaveButton.click = function leadSaveButton_click (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(1);
		waf.sources.lead.save({
			onSuccess: function(event) {
				console.log(event);
				WAK5CRMUTIL.setMessage("Lead: " + event.dataSource.firstName + " " + event.dataSource.lastName + " has been saved to the server.", 7000, "normal");
				WAK5CRMUTIL.newRecentItem("leads", "Lead: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
				//WAK5CRMUTIL.setMessage("Lead: " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " has been saved to the server.", 7000, "normal");
				//WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
		//Bug report: isNewElement(). The following line is only work-around.
		//waf.sources.lead.collectionRefresh(); //BAD BAD BAD
	};// @lock

	leadCancelButton.click = function leadCancelButton_click (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(1);
		if (waf.sources.lead.isNewElement()) {
			//Bug Report: isNewElement() reports true for an entity that has been saved it is still the current entity.
			waf.sources.lead.removeCurrentReference();
		}
	};// @lock

	convertLeadCancelButton.click = function convertLeadCancelButton_click (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(2);
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		
		if (waf.sources.lead.converted) {
			$$(tabView1).selectTab(4);
		} else {
			$$(accordion1).expand(1);
			$$(leadsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
			$$(tabView1).selectTab(2);
			//Add to recent items.
			WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
			// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013)
		}

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
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
