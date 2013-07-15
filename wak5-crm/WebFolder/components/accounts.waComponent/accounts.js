
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var tabView1 = getHtmlId('tabView1'),
		nameInputField = getHtmlId('nameInputField');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
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
	var newAccountButton = {};	// @button
	var accountsCancelButton = {};	// @button
	var accountsSaveButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newAccountButton.click = function newAccountButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.addNewElement();
		waf.sources.account.serverRefresh({
			onSuccess: function(event) {
				$$(tabView1).selectTab(2);
				$$(nameInputField).focus();
				//$$(leadsTitle).setValue("Lead Information");
			}
		});
	};// @lock

	accountsCancelButton.click = function accountsCancelButton_click (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(1);
	};// @lock

	accountsSaveButton.click = function accountsSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.newRecentItem("accounts", "Account: ", event.dataSource.name, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		$$(tabView1).selectTab(1);
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(tabView1).selectTab(2);
		//Add to recent items.
		console.log(waf.sources.account.name);
		console.log(waf.sources.account.ID);
		WAK5CRMUTIL.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newAccountButton", "click", newAccountButton.click, "WAF");
	WAF.addListener(this.id + "_accountsCancelButton", "click", accountsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_accountsSaveButton", "click", accountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
