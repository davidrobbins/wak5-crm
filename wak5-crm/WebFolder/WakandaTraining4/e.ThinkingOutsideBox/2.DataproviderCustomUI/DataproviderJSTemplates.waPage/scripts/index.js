
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock
	var itemsUL$ = $('#itemsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	listTemplateSource = $("#list-template").html(),
	listTemplateFn = Handlebars.compile(listTemplateSource),
	//Nav template.
	navUL$ = $('#navUL'),
	navTemplateSource = $("#nav-template").html(),
	navTemplateFn = Handlebars.compile(navTemplateSource),

	itemData = "";
	
// eventHandlers// @lock
	function buildNavList() {
		navData = [{title: "Leads", dataclass: "Leads"},{title: "Contacts", dataclass: "Contacts"},{title: "Accounts", dataclass: "Accounts"}];
		navData.forEach(function(navItem) {
			navUL$.append(navTemplateFn(navItem));
		});
	}
	
	function updateItemDetail(name, city, phone) {
		itemObj.name = name;
		itemObj.city = city;
		itemObj.phone = phone;
		waf.sources.itemObj.sync();
	}
	
	function buildItemsList(dataClassName) {
		itemsUL$.children().remove(); 

		switch(dataClassName) {
			case "Leads":
			ds.Lead.all({
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.fullName.getValue(),
								city:    	ev2.entity.city.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Leads"
							};
							itemsUL$.append(listTemplateFn(itemData));
						}
					}); //ev1.entityCollection.forEach
				}
			});
			break;
			
			case "Contacts":
			ds.Contact.all({
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.fullName.getValue(),
								city:    	ev2.entity.city.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Contacts"
							};
							itemsUL$.append(listTemplateFn(itemData));
						}
					}); //ev1.entityCollection.forEach
				}
			});
			break;
			
			case "Accounts":
			ds.Account.all({
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.name.getValue(),
								city:    	ev2.entity.city.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Accounts"
							};
							itemsUL$.append(listTemplateFn(itemData));
						}
					}); //ev1.entityCollection.forEach
				}
			});
			break;
		} //end - switch.
	} //end - buildItemsList.
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		//event handlers
		navUL$.on('click', '.navItem', function (event) {
	   		var this$ = $(this);
	   		this$.addClass('navPermSelected');
	   		this$.siblings().removeClass('navPermSelected');
	   		var dataclass = this$.children('div.itemIdent').attr('data-dataclass');
	   		buildItemsList(dataclass);
		});
		
		itemsUL$.on('mouseenter', '.itemPreview', function (event) {
	   		$(this).addClass('itemSelected');
		});

		itemsUL$.on('mouseleave', '.itemPreview', function (event) {
	   		$(this).removeClass('itemSelected');
		});
		
		itemsUL$.on('click', '.itemPreview', function (event) {
			var this$ = $(this);
	   		this$.addClass('itemPermSelected');
	   		this$.siblings().removeClass('itemPermSelected');
	   		var itemId = this$.children('div.itemIdent').attr('data-id');
	   		var dataclass = this$.children('div.itemIdent').attr('data-dataclass');
	   		
	   		switch(dataclass) {
				case "Leads":
				ds.Lead.find("ID = :1", itemId, {
		   			onSuccess: function(event) {
		   				updateItemDetail(event.entity.fullName.getValue(), event.entity.city.getValue(), event.entity.phone.getValue());
		   			}
		   		});
				break;

				case "Contacts":
				ds.Contact.find("ID = :1", itemId, {
		   			onSuccess: function(event) {
		   				updateItemDetail(event.entity.fullName.getValue(), event.entity.city.getValue(), event.entity.phone.getValue());
		   			}
		   		});
				break;

				case "Accounts":
				ds.Account.find("ID = :1", itemId, {
		   			onSuccess: function(event) {
		   				updateItemDetail(event.entity.name.getValue(), event.entity.city.getValue(), event.entity.phone.getValue());
		   			}
		   		});
				break;				
			} //end - switch.

		});
		
		//buildItemsList("Leads");
		buildNavList();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
