
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var nameInputField = getHtmlId('nameInputField'),
		accountsListContainer = getHtmlId('accountsListContainer'),
		accountsDetailContainer = getHtmlId('accountsDetailContainer'),
		accountsDetailMainContainer = getHtmlId('accountsDetailMainContainer'),
		accountsActivityDetailContainer = getHtmlId('accountsActivityDetailContainer');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("account.ID = :1", waf.sources.account.getCurrentElement().ID.getValue());
				$$(accountsListContainer).hide();
				$$(accountsDetailContainer).show();
			} else {
				$$(accountsDetailContainer).hide();
				$$(accountsListContainer).show();
			}
		}, 80);
		
	
	// @region namespaceDeclaration// @startlock
	var newAccountTaskButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var accountSaveActivityButton = {};	// @button
	var newAccountButton = {};	// @button
	var accountsCancelButton = {};	// @button
	var accountsSaveButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	newAccountTaskButton.click = function newAccountTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.contact.set(waf.sources.contact);
				$$(accountsDetailMainContainer).hide();
				$$(accountsActivityDetailContainer).show();
			}
		});
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		//Activity Grid.
		$$(accountsDetailMainContainer).hide();
		$$(accountsActivityDetailContainer).show();
	};// @lock

	accountSaveActivityButton.click = function accountSaveActivityButton_click (event)// @startlock
	{// @endlock
		$$(accountsActivityDetailContainer).hide();
		$$(accountsDetailMainContainer).show();
	};// @lock

	newAccountButton.click = function newAccountButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.addNewElement();
		waf.sources.account.serverRefresh({
			onSuccess: function(event) {
				waf.sources.account.save({
					onSuccess: function(ev2) {
						$$(accountsListContainer).hide();
						$$(accountsDetailContainer).show();
						$$(nameInputField).focus();
					}
				});
			}
		});
	};// @lock

	accountsCancelButton.click = function accountsCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.account.isNewElement()) {
			waf.sources.account.removeCurrentReference();
		}
		
		$$(accountsDetailContainer).hide();
		$$(accountsListContainer).show();
	};// @lock

	accountsSaveButton.click = function accountsSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Account: " + event.dataSource.name + " has been saved to the server.", 5000, "normal");
				WAK5CRMUTIL.newRecentItem("accounts", "Account: ", event.dataSource.name, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		
		$$(accountsDetailContainer).hide();
		$$(accountsListContainer).show();
		
		//$$(tabView1).selectTab(1);
		//Bug report: isNewElement(). The following line is only work-around.
		//waf.sources.account.collectionRefresh(); BAD BAD
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		waf.sources.activity.query("account.ID = :1", waf.sources.account.getCurrentElement().ID.getValue());
		$$(accountsListContainer).hide();
		$$(accountsDetailContainer).show();
		//$$(accordion1).expand(1);
		//$$(tabView1).selectTab(2);
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_newAccountTaskButton", "click", newAccountTaskButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_accountSaveActivityButton", "click", accountSaveActivityButton.click, "WAF");
	WAF.addListener(this.id + "_newAccountButton", "click", newAccountButton.click, "WAF");
	WAF.addListener(this.id + "_accountsCancelButton", "click", accountsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_accountsSaveButton", "click", accountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
