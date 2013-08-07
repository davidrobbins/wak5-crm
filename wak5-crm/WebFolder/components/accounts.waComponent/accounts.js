
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var nameInputField = getHtmlId('nameInputField'),
		accountsListContainer = getHtmlId('accountsListContainer'),
		accountsDetailContainer = getHtmlId('accountsDetailContainer'),
		accountsDetailMainContainer = getHtmlId('accountsDetailMainContainer'),
		accountsActivityDetailContainer = getHtmlId('accountsActivityDetailContainer'),
		notesComponent = getHtmlId('notesComponent');
		
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				waf.sources.activity.query("account.ID = :1", waf.sources.account.ID);
				$$(accountsListContainer).hide();
				$$(accountsDetailContainer).show();
			} else {
				$$(accountsDetailContainer).hide();
				$$(accountsListContainer).show();
			}
		}, 80);
		
	
	// @region namespaceDeclaration// @startlock
	var accountCancelActivityButton = {};	// @button
	var newAccountEventButton = {};	// @button
	var accountsCopyAddrButton = {};	// @button
	var newAccountTaskButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var accountSaveActivityButton = {};	// @button
	var newAccountButton = {};	// @button
	var accountsCancelButton = {};	// @button
	var accountsSaveButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	accountCancelActivityButton.click = function accountCancelActivityButton_click (event)// @startlock
	{// @endlock
		$$(accountsActivityDetailContainer).hide();
		$$(accountsDetailMainContainer).show();
	};// @lock

	newAccountEventButton.click = function newAccountEventButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "event";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.account.set(waf.sources.account);
				$$(accountsDetailMainContainer).hide();
				$$(accountsActivityDetailContainer).show();
			}
		});
	};// @lock

	accountsCopyAddrButton.click = function accountsCopyAddrButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.shippingStreet = waf.sources.account.billingStreet;
		waf.sources.account.shippingCity = waf.sources.account.billingCity;
		waf.sources.account.shippingState = waf.sources.account.billingState;
		waf.sources.account.shippingZip = waf.sources.account.billingZip;
		waf.sources.account.shippingCountry = waf.sources.account.billingCountry;
		waf.sources.account.autoDispatch();
		WAK5CRMUTIL.setMessage("Billing Address copied to Shipping Address.", 5000, "normal");

	};// @lock

	newAccountTaskButton.click = function newAccountTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.account.set(waf.sources.account);
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
		waf.sources.activity.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Activity for " + waf.sources.account.name +  " has been saved to the server.", 5000, "normal");
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
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
		
		//Load Note Component
		$$(notesComponent).loadComponent({path: '/components/notes.waComponent', userData: {section: "accounts", entityID: waf.sources.account.ID}});

		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_accountCancelActivityButton", "click", accountCancelActivityButton.click, "WAF");
	WAF.addListener(this.id + "_newAccountEventButton", "click", newAccountEventButton.click, "WAF");
	WAF.addListener(this.id + "_accountsCopyAddrButton", "click", accountsCopyAddrButton.click, "WAF");
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
