
(function Component (id) {// @lock

// Add the code that needs to be shared between components here


function constructor (id) {
	var container1 = getHtmlId('container1'),
		container2 = getHtmlId('container2'),
		activityDataGrid = getHtmlId('dataGrid1'),
		combobox1 = getHtmlId('combobox1'),
		combobox2 = getHtmlId('combobox2'),
		textField2 = getHtmlId('textField2');
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'smallActivity';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	$comp.sourcesVar.statusArr = [];
	$comp.sourcesVar.statusArr.push({title: 'Not Started'});
	$comp.sourcesVar.statusArr.push({title: 'Deferred'});
	$comp.sourcesVar.statusArr.push({title: 'In Progress'});
	$comp.sourcesVar.statusArr.push({title: 'Completed'});
	$comp.sourcesVar.statusArr.push({title: 'Waiting on Someone'});
	$comp.sources.statusArr.sync();
	
	$comp.sourcesVar.activityPriorityArr = [];
	$comp.sourcesVar.activityPriorityArr.push({title: 'Normal'});
	$comp.sourcesVar.activityPriorityArr.push({title: 'High'});
	$comp.sourcesVar.activityPriorityArr.push({title: 'Highest'});
	$comp.sourcesVar.activityPriorityArr.push({title: 'Low'});
	$comp.sourcesVar.activityPriorityArr.push({title: 'Lowest'});
	$comp.sources.activityPriorityArr.sync();
		
		
	// @region namespaceDeclaration// @startlock
	var statusArrEvent = {};	// @dataSource
	var activityPriorityArrEvent = {};	// @dataSource
	var smallActivitySaveButton = {};	// @button
	var newSmallTaskButton = {};	// @button
	var smallActivityCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	statusArrEvent.onCurrentElementChange = function statusArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		waf.sources.activity.status = event.dataSource.title;
		waf.sources.activity.autoDispatch();
	};// @lock

	activityPriorityArrEvent.onCurrentElementChange = function activityPriorityArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		waf.sources.activity.priority = event.dataSource.title;
		waf.sources.activity.autoDispatch();
	};// @lock

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
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
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
				
				$$(activityDataGrid).hide();
				$$(container2).show();
				$$(textField2).focus();
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
		$$(activityDataGrid).hide();
		$$(container2).show();
		$$(combobox1).setValue(waf.sources.activity.priority);
		$$(combobox2).setValue(waf.sources.activity.status);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_statusArr", "onCurrentElementChange", statusArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_activityPriorityArr", "onCurrentElementChange", activityPriorityArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_smallActivitySaveButton", "click", smallActivitySaveButton.click, "WAF");
	WAF.addListener(this.id + "_newSmallTaskButton", "click", newSmallTaskButton.click, "WAF");
	WAF.addListener(this.id + "_smallActivityCancelButton", "click", smallActivityCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
