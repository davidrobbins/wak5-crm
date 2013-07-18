
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
		console.log(activityDataGrid);
	// @region namespaceDeclaration// @startlock
	var smallActivityCancelButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	smallActivityCancelButton.click = function smallActivityCancelButton_click (event)// @startlock
	{// @endlock
		$$(activityDataGrid).show();;
		$$(container2).hide();
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		$$(activityDataGrid).hide();;
		$$(container2).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_smallActivityCancelButton", "click", smallActivityCancelButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
