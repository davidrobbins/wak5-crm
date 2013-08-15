
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var welcomeMessageRichText = getHtmlId('welcomeMessageRichText'),
		chartContainerPlaceHolder = getHtmlId('chartContainerPlaceHolder'),
		component1 = getHtmlId('component1'),
		messageChangeOwnerContainer = getHtmlId('messageChangeOwnerContainer'),
		//Transferred Leads, Contacts, Accounts Messages.
		selectedTransferredUL$ = getHtmlObj('selectedTransferredUL'), //selectedTransferredUL
		selectedTransferredListTemplateSource = $('#selected-transferred-list-template').html(), //selected-transferred-list-template
		selectedTransferredListTemplateFn = Handlebars.compile(selectedTransferredListTemplateSource),
		transferredData = {};
	
	
	function buildSelectedTransferredList(selectedTransferredCollection) {
		selectedTransferredUL$.children().remove(); 
		
		selectedTransferredCollection.forEach({
			onSuccess: function(ev2) {	
			
				transferredData = 	{
					fullName:  	ev2.entity.fullName.getValue(),
					company: 	ev2.entity.company.getValue(),
					email: 		ev2.entity.emailAccnt.getValue(),
					dataId: 	ev2.entity.ID.getValue()
				}; 
				
				selectedTransferredUL$.append(selectedTransferredListTemplateFn(transferredData));
			}
		});
	} //end - buildSelectedLeadsList.
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		selectedTransferredUL$.on('mouseenter', '.selectedTransferred', function (event) {
	   		$(this).addClass('hoverTransferred');
		});
		
		selectedTransferredUL$.on('mouseleave', '.selectedTransferred', function (event) {
	   		$(this).removeClass('hoverTransferred');
		});
		
		ds.Lead.all({
			onSuccess: function(ev) {
				buildSelectedTransferredList(ev.entityCollection);
			}
		});
		
		$$(component1).loadComponent({path: '/components/leadStatus.waComponent'});
		
		$$(welcomeMessageRichText).setValue("Welcome " + waf.directory.currentUser().fullName);
		//waf.sources.activity.query("status !== :1", "Completed");
		
		//Note: Refactor. Bug. onRestrictingQuery for Activity won't fire.
		ds.User.find("email == :1", waf.directory.currentUser().userName,  {
			onSuccess: function(event) {
					
				waf.sources.activity.query("owner.ID = :1 && status != :2", event.entity.ID.value, "Completed");
				/*
				if (waf.directory.currentUserBelongsTo('Manager') || waf.directory.currentUserBelongsTo('Administrator')) {
					waf.sources.activity.all();
				} else {
					waf.sources.activity.query("owner.ID = :1", event.entity.ID.value);
				}
				*/
			}
		});
		
		
		/*
		var s1 = [200, 600, 700, 1000];
	    var s2 = [460, -210, 690, 820];
	    var s3 = [-260, -440, 320, 200];
	    // Can specify a custom tick Array.
	    // Ticks should match up one for each y value (category) in the series.
	    var ticks = ['May', 'June', 'July', 'August'];
	     
	    var plot1 = $.jqplot(chartContainerPlaceHolder, [s1, s2, s3], {
	        // The "seriesDefaults" option is an options object that will
	        // be applied to all series in the chart.
	        seriesDefaults:{
	            renderer:$.jqplot.BarRenderer,
	            rendererOptions: {fillToZero: true}
	        },
	        // Custom labels for the series are specified with the "label"
	        // option on the series option.  Here a series option object
	        // is specified for each series.
	        series:[
	            {label:'ACME'},
	            {label:'Pep Boys'},
	            {label:'Costco'}
	        ],
	        // Show the legend and put it outside the grid, but inside the
	        // plot container, shrinking the grid to accomodate the legend.
	        // A value of "outside" would not shrink the grid and allow
	        // the legend to overflow the container.
	        legend: {
	            show: true,
	            placement: 'outsideGrid'
	        },
	        axes: {
	            // Use a category axis on the x axis and use our custom ticks.
	            xaxis: {
	                renderer: $.jqplot.CategoryAxisRenderer,
	                ticks: ticks
	            },
	            // Pad the y axis just a little so bars can get close to, but
	            // not touch, the grid boundaries.  1.2 is the default padding.
	            yaxis: {
	                pad: 1.05,
	                tickOptions: {formatString: '$%d'}
	            }
	        }
	    });
		*/
		
		
	// @region namespaceDeclaration// @startlock
	var messageDismissButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	messageDismissButton.click = function messageDismissButton_click (event)// @startlock
	{// @endlock
		$$(messageChangeOwnerContainer).hide();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_messageDismissButton", "click", messageDismissButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
