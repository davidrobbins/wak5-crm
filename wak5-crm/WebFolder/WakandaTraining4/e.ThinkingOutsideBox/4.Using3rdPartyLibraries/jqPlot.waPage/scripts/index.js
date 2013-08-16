
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		
		/*
		var data = [
		    ['Heavy Industry', 12],['Retail', 9], ['Light Industry', 14], 
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
		 
		 
		 
		/**/
		waf.sources.lead.jqPlotLeadSource({
			onSuccess: function(ev) {
				var plot1 = jQuery.jqplot ('chartContainer', ev.result, 
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
		
		
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		 
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
