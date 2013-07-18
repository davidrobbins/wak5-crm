
(function Component (id) {// @lock

// Add the code that needs to be shared between components here


function constructor (id) {
	var container1 = getHtmlId('container1'),
		container2 = getHtmlId('container2'),
		activityDataGrid = getHtmlId('dataGrid1');
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'smallActivity';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var smallActivitySaveButton = {};	// @button
	var newSmallTaskButton = {};	// @button
	var smallActivityCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	smallActivitySaveButton.click = function smallActivitySaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Task " + event.dataSource.subject + " has been saved to the server.", 7000, "normal");
				$$(activityDataGrid).show();;
				$$(container2).hide();
			}
		});
	};// @lock

	newSmallTaskButton.click = function newSmallTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.serverRefresh();
		waf.sources.activity.type = "task";
		
		switch(data.userData.view) {
			case "account":
			waf.sources.activity.account.set(waf.sources.account);
			break;
			
			case "lead":
			waf.sources.activity.lead.set(waf.sources.lead);
			break;
			
			case "contact":
			waf.sources.activity.contact.set(waf.sources.contact);
			break;
		}
		
		waf.sources.activity.save({
			onSuccess: function(event) {
				$$(activityDataGrid).hide();;
				$$(container2).show();
			}
		});
	};// @lock

	smallActivityCancelButton.click = function smallActivityCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.activity.isNewElement()) {
			waf.sources.activity.removeCurrentReference();
		}
		$$(activityDataGrid).show();;
		$$(container2).hide();
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(activityDataGrid).hide();;
		$$(container2).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_smallActivitySaveButton", "click", smallActivitySaveButton.click, "WAF");
	WAF.addListener(this.id + "_newSmallTaskButton", "click", newSmallTaskButton.click, "WAF");
	WAF.addListener(this.id + "_smallActivityCancelButton", "click", smallActivityCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
