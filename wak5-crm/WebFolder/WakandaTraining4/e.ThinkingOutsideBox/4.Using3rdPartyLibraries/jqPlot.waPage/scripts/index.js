
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var plotButton = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	plotButton.click = function plotButton_click (event)// @startlock
	{// @endlock
		
		waf.sources.lead.jqPlotLeadSource({
			onSuccess: function(ev) {
				var plot1 = jQuery.jqplot ('chartContainer', [ev.result], 
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
			}
		});
		
		/*
		var data = [
		    ['Heavy Industry', 120],['Retail', 9], ['Light Industry', 14], 
		    ['Out of home', 16],['Commuting', 7], ['Orientation', 9]
		  ];
		  
		  var plot1 = jQuery.jqplot ('chartContainer', [data], 
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
		  */
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("plotButton", "click", plotButton.click, "WAF");
// @endregion
};// @endlock
