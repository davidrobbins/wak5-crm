
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock
	var daveObj = {one: "one", two: "two"};
	
	button1.click = function button1_click (event)// @startlock
	{// @endlock
		console.log("First: " + daveObj.one);
		 
		waf.sources.lead.userDataTest({name: "David Robbins"}, {
			onSuccess: function(event) {
				console.log("Second: " + event.userData.one);
			},
			
			userData: daveObj
		});
		
		daveObj.one = "three";
		console.log("Third: " + daveObj.one);
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
