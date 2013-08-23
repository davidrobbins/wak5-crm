
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock
	var itemsUL$ = $('#itemsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	listTemplateSource = $("#list-template").html(),
	listTemplateFn = Handlebars.compile(listTemplateSource),
	itemData = "";
	
// eventHandlers// @lock
	function buildItemsList() {
		itemsUL$.children().remove(); 

		ds.Lead.all({
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {	
						itemData = 	{
							name:  		ev2.entity.fullName.getValue(),
							city:    	ev2.entity.city.getValue(),
							dataId: 	ev2.entity.ID.getValue()
						};
						itemsUL$.append(listTemplateFn(itemData));
					}
				}); //ev1.entityCollection.forEach
			}
		});
	}
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//event handlers
		itemsUL$.on('mouseenter', '.itemPreview', function (event) {
	   		$(this).addClass('itemSelected');
		});

		itemsUL$.on('mouseleave', '.itemPreview', function (event) {
	   		$(this).removeClass('itemSelected');
		});
		
		buildItemsList();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
