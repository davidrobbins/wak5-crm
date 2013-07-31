﻿
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

//noteComponent 850x270  top: 173  left:20 right:20 bottom:5

//Notes: activitySmallComponent : /components/smallActivity.waComponent 912 x 470  top: 10 bottom: 10 right: 10 left: 10
function constructor (id) {
	var leadsListContainer = getHtmlId('leadsListContainer'),
		leadsDetailContainer = getHtmlId('leadsDetailContainer'),
		leadsConvertContainer = getHtmlId('leadsConvertContainer'),
		leadsNoAccessContainer = getHtmlId('leadsNoAccessContainer'),
		leadsDetailMainContainer = getHtmlId('leadsDetailMainContainer'),
		leadsActivityDetailContainer = getHtmlId('leadsActivityDetailContainer'),
		firstNameInputfield = getHtmlId('firstNameInputfield');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock
	
	
		
	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
				$$(leadsListContainer).hide();
				$$(leadsDetailContainer).show();
				
			} else {
				$$(leadsDetailContainer).hide();
				$$(leadsListContainer).show();
			}
		}, 80);
		
		$comp.sourcesVar.leadTypeArr = [];
		$comp.sourcesVar.leadTypeArr.push({title: 'Open Leads'});
		$comp.sourcesVar.leadTypeArr.push({title: 'Converted Leads'});
		$comp.sources.leadTypeArr.sync();
			
	// @region namespaceDeclaration// @startlock
	var leadSaveActivityButton = {};	// @button
	var leadCancelActivityButton = {};	// @button
	var dataGrid3 = {};	// @dataGrid
	var dataGrid2 = {};	// @dataGrid
	var newLeadTaskButton = {};	// @button
	var leadsNoAccessBackButton = {};	// @button
	var leadTypeArrEvent = {};	// @dataSource
	var submitConvertLeadButton = {};	// @button
	var convertLeadButton = {};	// @button
	var leadNewButton = {};	// @button
	var leadSaveButton = {};	// @button
	var leadCancelButton = {};	// @button
	var convertLeadCancelButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	leadSaveActivityButton.click = function leadSaveActivityButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Activity for lead: " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " has been saved to the server.", 5000, "normal");
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
		$$(leadsActivityDetailContainer).hide();
		$$(leadsDetailMainContainer).show();
		
	};// @lock

	leadCancelActivityButton.click = function leadCancelActivityButton_click (event)// @startlock
	{// @endlock
		//Activity Grid.
		$$(leadsActivityDetailContainer).hide();
		$$(leadsDetailMainContainer).show();
	};// @lock

	dataGrid3.onRowDblClick = function dataGrid3_onRowDblClick (event)// @startlock
	{// @endlock
			//Activity Grid.
			$$(leadsDetailMainContainer).hide();
			$$(leadsActivityDetailContainer).show();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		
		waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		waf.sources.note.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		
		if (waf.sources.lead.converted) {
			$$(leadsListContainer).hide();
			$$(leadsNoAccessContainer).show();
			
		} else {
			$$(leadsListContainer).hide();
			$$(leadsDetailContainer).show();
			//Add to recent items.
			WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
			// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013)
		}
	};// @lock

	newLeadTaskButton.click = function newLeadTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.lead.set(waf.sources.lead);
				$$(leadsDetailMainContainer).hide();
				$$(leadsActivityDetailContainer).show();
			}
		});
	};// @lock

	leadsNoAccessBackButton.click = function leadsNoAccessBackButton_click (event)// @startlock
	{// @endlock
		$$(leadsNoAccessContainer).hide();
		$$(leadsListContainer).show();
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
		$$(leadsDetailContainer).hide();
		$$(leadsConvertContainer).show();
	};// @lock

	leadNewButton.click = function leadNewButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess: function(event) {
				waf.sources.lead.save({
					onSuccess: function(ev2) {
						$$(leadsListContainer).hide();
						$$(leadsDetailContainer).show();
						$$(firstNameInputfield).focus();
						waf.sources.activity.setEntityCollection();
						waf.sources.note.setEntityCollection();
					}
				});
			}
		});
	};// @lock

	leadSaveButton.click = function leadSaveButton_click (event)// @startlock
	{// @endlock
		$$(leadsDetailContainer).hide();
		$$(leadsListContainer).show();
		
		waf.sources.lead.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Lead: " + event.dataSource.firstName + " " + event.dataSource.lastName + " has been saved to the server.", 5000, "normal");
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
			if (waf.sources.lead.isNewElement()) {
			//Bug Report: isNewElement() reports true for an entity that has been saved it is still the current entity.
			waf.sources.lead.removeCurrentReference();
		}
		
		$$(leadsDetailContainer).hide();
		$$(leadsListContainer).show();
		
		
	};// @lock

	convertLeadCancelButton.click = function convertLeadCancelButton_click (event)// @startlock
	{// @endlock
		$$(leadsConvertContainer).hide();
		$$(leadsDetailContainer).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_leadSaveActivityButton", "click", leadSaveActivityButton.click, "WAF");
	WAF.addListener(this.id + "_leadCancelActivityButton", "click", leadCancelActivityButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid3", "onRowDblClick", dataGrid3.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newLeadTaskButton", "click", newLeadTaskButton.click, "WAF");
	WAF.addListener(this.id + "_leadsNoAccessBackButton", "click", leadsNoAccessBackButton.click, "WAF");
	WAF.addListener(this.id + "_leadTypeArr", "onCurrentElementChange", leadTypeArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_submitConvertLeadButton", "click", submitConvertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadButton", "click", convertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_leadNewButton", "click", leadNewButton.click, "WAF");
	WAF.addListener(this.id + "_leadSaveButton", "click", leadSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadCancelButton", "click", leadCancelButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadCancelButton", "click", convertLeadCancelButton.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
