
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var tabView2 = getHtmlId('tabView2');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(2);
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		$$(tabView2).selectTab(2);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
