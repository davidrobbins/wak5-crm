
(function Component (id) {// @lock
	
// Add the code that needs to be shared between components here

function constructor (id) {
	var chartContainer = getHtmlId('chartContainer');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leadStatus';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log($.jqplot);
		 var data = [
		    ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
		    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
		  ];
		  var plot1 = jQuery.jqplot (chartContainer, [data], 
		    { 
		      seriesDefaults: {
		        // Make this a pie chart.
		        renderer: jQuery.jqplot.PieRenderer, 
		        rendererOptions: {
		          // Put data labels on the pie slices.
		          // By default, labels show the percentage of the slice.
		          showDataLabels: true
		        }
		      }, 
		      legend: { show:true, location: 'e' }
		    }
		  );
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
