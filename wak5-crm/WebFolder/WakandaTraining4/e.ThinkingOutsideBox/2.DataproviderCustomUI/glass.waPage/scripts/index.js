
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

	var userListUL$ = $('#userListUL'),
		userListTemplateSource = $("#user-template").html(),
		userListTemplateFn = Handlebars.compile(userListTemplateSource),
		
		//Lead Grid Row Template
		leadGridUL$ = $('#leadGridUL'),
		leadGridRowTemplate = $("#lead-row-template").html(),
		leadGridRowTemplateFn = Handlebars.compile(leadGridRowTemplate);
	
	
	
	function buildUserList() {
		userListUL$.children().remove();
		
		ds.User.all({
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {	
						userData = 	{
							name:  		ev2.entity.fullName.getValue(),
							title:    	ev2.entity.title.getValue(),
							dataId: 	ev2.entity.email.getValue() //ev2.entity.ID.getValue()
						};
						
						userListUL$.append(userListTemplateFn(userData));
					} //end - onSuccess ev2
				}); //end - ev1.entityCollection.forEach;
			} //end - onSuccess ev1
		});	
	}
	
	function buildLeadGridRow(leadRowObject) {
		leadGridUL$.append(leadGridRowTemplateFn(leadRowObject));
	} //end - buildLeadGridRow.
	
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		buildUserList();
		
		userListUL$.on('mouseenter', '.userPreview', function (event) {
	   		$(this).addClass('userSelected');
		});

		userListUL$.on('mouseleave', '.userPreview', function (event) {
	   		$(this).removeClass('userSelected');
		});
		
		userListUL$.on('click', '.userPreview', function (event) {
			leadGridUL$.children().remove();
			
	   		var this$ = $(this);
	   		this$.addClass('userPermSelected');
	   		this$.siblings().removeClass('userPermSelected');
	   		
	   		var userId = this$.children('div.userIdent').attr('data-id');
	   		ds.User.find("email = :1", userId, {
	   			autoExpand: "leadCollection",
	   			onSuccess: function(event) {
	   				var count = 0,
	   					leadsArray = [];
	   					
	   				event.entity.leadCollection.relEntityCollection.forEach({
	   					onSuccess: function(ev2) {
	   						count += 1;
	   						leadsArray.push(ev2.entity.fullName.getValue());
	   						if ((count % 3 == 0) & (count > 0)){
	   							var leadRowObject = {name1: leadsArray[0], name2: leadsArray[1], name3: leadsArray[2]};
	   							//console.log(leadRowObject);
	   							buildLeadGridRow(leadRowObject);
	   							leadsArray = [];
	   						}
	   					},
	   					
	   					atTheEnd: function(ev2) {
	   						//console.log(leadsArray);
	   						//buildLeadGridRow();
	   					}
	   				});
	   			}
	   		});
		});

	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
