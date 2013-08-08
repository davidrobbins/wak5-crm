
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsListContainer = getHtmlId('leadsListContainer'),
		leadsDetailContainer = getHtmlId('leadsDetailContainer'),
		leadsConvertContainer = getHtmlId('leadsConvertContainer'),
		leadsNoAccessContainer = getHtmlId('leadsNoAccessContainer'),
		leadsDetailMainContainer = getHtmlId('leadsDetailMainContainer'),
		leadsActivityDetailContainer = getHtmlId('leadsActivityDetailContainer'),
		changeOwnerContainer = getHtmlId('changeOwnerContainer'),
		leadsEmailContainer = getHtmlId('leadsEmailContainer'),
		firstNameInputfield = getHtmlId('firstNameInputfield'),
		emailSubject = getHtmlId('emailSubject'),
		combobox2 = getHtmlId('combobox2'), 
		combobox1 = getHtmlId('combobox1'), 
		dataGridLeadsList = getHtmlId('dataGrid2'),
		notesComponent = getHtmlId('notesComponent'),
		activityDetailComponent = getHtmlId('activityDetailComponent'),
		combobox3$ = getHtmlObj('combobox3'),
		combobox4$ = getHtmlObj('combobox4'),
		
		selectedLeadsUL$ = getHtmlObj('selectedLeadsUL'),
		selectedLeadsListTemplateSource = $('#selected-leads-list-template').html(),
		selectedLeadsListTemplateFn = Handlebars.compile(selectedLeadsListTemplateSource),
		leadData = {};
		
		function buildSelectedLeadsList(selectedLeadsCollection) {
			selectedLeadsUL$.children().remove(); 
			
			selectedLeadsCollection.forEach({
				onSuccess: function(ev2) {
							
					leadData = 	{
						fullName:  	ev2.entity.fullName.getValue(),
						company: 	ev2.entity.company.getValue(),
						email: 		ev2.entity.emailAccnt.getValue(),
						dataId: 	ev2.entity.ID.getValue(),
						owner: 		ev2.entity.owner.value.fullName
					};
					selectedLeadsUL$.append(selectedLeadsListTemplateFn(leadData));
				}
			});
		} //end - buildSelectedLeadsList.
			
			
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock
		setTimeout(function() {
			if (data.userData.view == "detail") {
				//waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
				
				waf.sources.activity.query("lead.ID = :1", waf.sources.lead.ID);
				$$(leadsListContainer).hide();
				$$(leadsDetailContainer).show();
				
			} else {
				$$(leadsDetailContainer).hide();
				$$(leadsListContainer).show();
			}
		}, 80);
		
		$comp.sourcesVar.leadTypeArr = [];
		$comp.sourcesVar.leadTypeArr.push({title: 'Open Leads'});
		$comp.sourcesVar.leadTypeArr.push({title: 'Converted Leads'});
		$comp.sources.leadTypeArr.sync();
		
		$comp.sourcesVar.moreActionsArr = [];
		$comp.sourcesVar.moreActionsArr.push({title: 'More Actions'});
		$comp.sourcesVar.moreActionsArr.push({title: 'Mass Update'});
		$comp.sourcesVar.moreActionsArr.push({title: 'Change Owner'});
		$comp.sourcesVar.moreActionsArr.push({title: 'Mail Merge'});
		$comp.sources.moreActionsArr.sync();
		
		waf.ds.User.getOtherUsers({
			onSuccess: function(event) {
				$comp.sourcesVar.otherGuysArr = event.result.slice(0);
				$comp.sources.otherGuysArr.sync();	
			} //end - onSuccess
		});
		
		selectedLeadsUL$.on('mouseenter', '.selectedLeads', function (event) {
	   		$(this).addClass('hoverLead');
		});
		
		selectedLeadsUL$.on('mouseleave', '.selectedLeads', function (event) {
	   		$(this).removeClass('hoverLead');
		});
		
		//Load activity detail component.
		$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: leadsDetailMainContainer, activityDetailContainer: leadsActivityDetailContainer}});

			
	// @region namespaceDeclaration// @startlock
	var leadChangeOwnerButton = {};	// @button
	var leadMassUpdateButton = {};	// @button
	var leadDeleteButton = {};	// @button
	var changeLeadOwnerButton = {};	// @button
	var moreActionsArrEvent = {};	// @dataSource
	var cancelLeadOwnerButton = {};	// @button
	var newLeadEventButton = {};	// @button
	var sendEmail = {};	// @button
	var cancelEmail = {};	// @button
	var cloneButton = {};	// @button
	var sendMailButton = {};	// @button
	var dataGrid3 = {};	// @dataGrid
	var dataGrid2 = {};	// @dataGrid
	var newLeadTaskButton = {};	// @button
	var leadsNoAccessBackButton = {};	// @button
	var leadTypeArrEvent = {};	// @dataSource
	var submitConvertLeadButton = {};	// @button
	var convertLeadButton = {};	// @button
	var leadNewButton = {};	// @button
	var leadSaveButton = {};	// @button
	var leadCancelButton = {};	// @button
	var convertLeadCancelButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	leadChangeOwnerButton.click = function leadChangeOwnerButton_click (event)// @startlock
	{// @endlock
		if (waf.directory.currentUserBelongsTo("Manager")) {
			waf.sources.lead.getEntityCollection().buildFromSelection(waf.sources.lead.getSelection(), {
				onSuccess: function(event) {
					buildSelectedLeadsList(event.entityCollection);
				}
			});
				
			$$(leadsListContainer).hide();
			$$(changeOwnerContainer).show();
		
		} else {
			WAK5CRMUTIL.setMessage("You do not have permission to transfer leads.", 4000, "error");
		}
	};// @lock

	leadMassUpdateButton.click = function leadMassUpdateButton_click (event)// @startlock
	{// @endlock
		WAK5CRMUTIL.setMessage("The Mass Update option is not yet implemented.", 4000, "error");
	};// @lock

	leadDeleteButton.click = function leadDeleteButton_click (event)// @startlock
	{// @endlock
		WAK5CRMUTIL.setMessage("The Delete option is not yet implemented.", 4000, "error");
	};// @lock

	changeLeadOwnerButton.click = function changeLeadOwnerButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.changeOwner({ownerID: $$(combobox2).getValue(), leadsSelectionArr: $$(dataGridLeadsList).getSelectedRows()}, {
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage(event.result, 4000);
				waf.sources.lead.collectionRefresh();
				//Update Recent Items because some of them may have been removed as a result of lead change owner.
				WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer'); // Note: Refactor so "mainComponent_recentItemsComponent
				$$(changeOwnerContainer).hide();
				$$(leadsListContainer).show();
				
			}
		});
	};// @lock

	moreActionsArrEvent.onCurrentElementChange = function moreActionsArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		switch(event.dataSource.title) {
			case "More Actions":
			WAK5CRMUTIL.setMessage("Please select an action.", 5000, "error");
			break;
			
			case "Mail Merge":
			WAK5CRMUTIL.setMessage("The Mail Merge option is not yet implemented.", 5000, "error");
			break;
			
			case "Mass Update":
			WAK5CRMUTIL.setMessage("The Mass Update option is not yet implemented.", 5000, "error");
			break;
			
			case "Change Owner":
			waf.sources.lead.getEntityCollection().buildFromSelection(waf.sources.lead.getSelection(), {
				onSuccess: function(event) {
					buildSelectedLeadsList(event.entityCollection);
				}
			});
				
			$$(leadsListContainer).hide();
			$$(changeOwnerContainer).show();
			break;
		}
	};// @lock

	cancelLeadOwnerButton.click = function cancelLeadOwnerButton_click (event)// @startlock
	{// @endlock
		$$(changeOwnerContainer).hide();
		$$(leadsListContainer).show();
	};// @lock

	newLeadEventButton.click = function newLeadEventButton_click (event)// @startlock
	{// @endlock
		
		//Note: Refactor!
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "event";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.lead.set(waf.sources.lead);
				$$(leadsDetailMainContainer).hide();
				$$(leadsActivityDetailContainer).show();
			}
		});
	};// @lock

	sendEmail.click = function sendEmail_click (event)// @startlock
	{// @endlock
		//var sendEmailObj = {};
		//sendEmailObj.subject = $$(emailSubject).getValue();
		WAK5CRMUTIL.sendMail($comp.sourcesVar.sendMailObj);
		
		$$(leadsEmailContainer).hide();
		$$(leadsDetailContainer).show();
	};// @lock

	cancelEmail.click = function cancelEmail_click (event)// @startlock
	{// @endlock
		$$(leadsEmailContainer).hide();
		$$(leadsDetailContainer).show();
	};// @lock

	cloneButton.click = function cloneButton_click (event)// @startlock
	{// @endlock
		//$$(leadsDetailContainer).hide();
		//$$(leadsConvertContainer).show();
		WAK5CRMUTIL.setMessage("The Clone function is not yet implemented.", 5000, "error");

	};// @lock

	sendMailButton.click = function sendMailButton_click (event)// @startlock
	{// @endlock
		$comp.sourcesVar.sendMailObj.to = waf.sources.lead.emailAccnt;
		$comp.sources.sendMailObj.sync();
		
		$$(leadsDetailContainer).hide();
		$$(leadsEmailContainer).show();
	};// @lock

	dataGrid3.onRowDblClick = function dataGrid3_onRowDblClick (event)// @startlock
	{// @endlock
			//Activity Grid.
			$$(leadsDetailMainContainer).hide();
			//$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {leadsDetailMainContainer: leadsDetailMainContainer, leadsActivityDetailContainer: leadsActivityDetailContainer}});
			$$(leadsActivityDetailContainer).show();
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		//Leads List Grid
		waf.sources.activity.query("lead.ID = :1", waf.sources.lead.ID);
		//waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		//waf.sources.note.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		
		
		//Load Note Component
		$$(notesComponent).loadComponent({path: '/components/notes.waComponent', userData: {section: "leads", entityID: waf.sources.lead.ID}});
		
		
		/*
		if (waf.sources.lead.isNewElement()) {
			$comp.sourcesVar.noteObj.title = null;
			$comp.sourcesVar.noteObj.createDate = null;
			$comp.sourcesVar.noteObj.body = null;
			$comp.sources.noteObj.sync();
		} else {
			buildNoteGrid();
		}
		*/
		
		if (waf.sources.lead.converted) {
			$$(leadsListContainer).hide();
			$$(leadsNoAccessContainer).show();
			
		} else {
			$$(leadsListContainer).hide();
			$$(leadsDetailContainer).show();
			//Add to recent items.
			WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
			// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013)
		}
	};// @lock

	newLeadTaskButton.click = function newLeadTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.lead.set(waf.sources.lead);
				$$(leadsDetailMainContainer).hide();
				$$(leadsActivityDetailContainer).show();
			}
		});
	};// @lock

	leadsNoAccessBackButton.click = function leadsNoAccessBackButton_click (event)// @startlock
	{// @endlock
		$$(leadsNoAccessContainer).hide();
		$$(leadsListContainer).show();
	};// @lock

	leadTypeArrEvent.onCurrentElementChange = function leadTypeArrEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		switch(event.dataSource.title) {
			case "Converted Leads":
			waf.sources.lead.query("converted == true");
			break;
			
			case "Open Leads":
			waf.sources.lead.query("converted == false");
			break;
		}
	};// @lock

	submitConvertLeadButton.click = function submitConvertLeadButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.convertLead({
			onSuccess: function(event) {
				WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer', event.result.recentItemArray); // Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).
				waf.sources.account.all();
				waf.sources.contact.all({
					onSuccess: function(evContact) {
						waf.sources.contact.selectByKey(event.result.contactID);
						WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(2, {view: "detail"});
						//$$('bodyComponent').loadComponent({path: '/contacts.waComponent', userData: {view: "detail"}});
					}
				});
				waf.sources.lead.query("converted == false", {
					onSuccess: function(evLead) {
						//$$(id + "_tabView2").selectTab(1);
					} //onSuccess
				});
			} //end - onSuccess.
		});//end - convertLead().
	};// @lock

	convertLeadButton.click = function convertLeadButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.lead.company == null) {
			WAK5CRMUTIL.setMessage("You have not entered a company.", 4000, "error");
		}
		
		$$(leadsDetailContainer).hide();
		$$(leadsConvertContainer).show();
	};// @lock

	leadNewButton.click = function leadNewButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.addNewElement();
		waf.sources.lead.serverRefresh({
			onSuccess: function(event) {
				waf.sources.lead.save({
					onSuccess: function(ev2) {
						//Note: Bug - Refactor - Super hack fix later.
						combobox3$.find('input').val('-none-');
						combobox4$.find('input').val('-none-');
			
						$$(leadsListContainer).hide();
						$$(leadsDetailContainer).show();
						$$(firstNameInputfield).focus();
						waf.sources.activity.setEntityCollection();
						//waf.sources.note.setEntityCollection();
					}
				});
			}
		});
	};// @lock

	leadSaveButton.click = function leadSaveButton_click (event)// @startlock
	{// @endlock
		$$(leadsDetailContainer).hide();
		$$(leadsListContainer).show();
		
		waf.sources.lead.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Lead: " + event.dataSource.firstName + " " + event.dataSource.lastName + " has been saved to the server.", 5000, "normal");
				WAK5CRMUTIL.newRecentItem("leads", "Lead: ", event.dataSource.firstName + " " + event.dataSource.lastName, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
				//WAK5CRMUTIL.setMessage("Lead: " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " has been saved to the server.", 7000, "normal");
				//WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
		//Bug report: isNewElement(). The following line is only work-around.
		//waf.sources.lead.collectionRefresh(); //BAD BAD BAD
	};// @lock

	leadCancelButton.click = function leadCancelButton_click (event)// @startlock
	{// @endlock
			if (waf.sources.lead.isNewElement()) {
			//Bug Report: isNewElement() reports true for an entity that has been saved it is still the current entity.
			waf.sources.lead.removeCurrentReference();
		}
		
		$$(leadsDetailContainer).hide();
		$$(leadsListContainer).show();
		
		
	};// @lock

	convertLeadCancelButton.click = function convertLeadCancelButton_click (event)// @startlock
	{// @endlock
		$$(leadsConvertContainer).hide();
		$$(leadsDetailContainer).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_leadChangeOwnerButton", "click", leadChangeOwnerButton.click, "WAF");
	WAF.addListener(this.id + "_leadMassUpdateButton", "click", leadMassUpdateButton.click, "WAF");
	WAF.addListener(this.id + "_leadDeleteButton", "click", leadDeleteButton.click, "WAF");
	WAF.addListener(this.id + "_changeLeadOwnerButton", "click", changeLeadOwnerButton.click, "WAF");
	WAF.addListener(this.id + "_moreActionsArr", "onCurrentElementChange", moreActionsArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_cancelLeadOwnerButton", "click", cancelLeadOwnerButton.click, "WAF");
	WAF.addListener(this.id + "_newLeadEventButton", "click", newLeadEventButton.click, "WAF");
	WAF.addListener(this.id + "_sendEmail", "click", sendEmail.click, "WAF");
	WAF.addListener(this.id + "_cancelEmail", "click", cancelEmail.click, "WAF");
	WAF.addListener(this.id + "_cloneButton", "click", cloneButton.click, "WAF");
	WAF.addListener(this.id + "_sendMailButton", "click", sendMailButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid3", "onRowDblClick", dataGrid3.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newLeadTaskButton", "click", newLeadTaskButton.click, "WAF");
	WAF.addListener(this.id + "_leadsNoAccessBackButton", "click", leadsNoAccessBackButton.click, "WAF");
	WAF.addListener(this.id + "_leadTypeArr", "onCurrentElementChange", leadTypeArrEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_submitConvertLeadButton", "click", submitConvertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadButton", "click", convertLeadButton.click, "WAF");
	WAF.addListener(this.id + "_leadNewButton", "click", leadNewButton.click, "WAF");
	WAF.addListener(this.id + "_leadSaveButton", "click", leadSaveButton.click, "WAF");
	WAF.addListener(this.id + "_leadCancelButton", "click", leadCancelButton.click, "WAF");
	WAF.addListener(this.id + "_convertLeadCancelButton", "click", convertLeadCancelButton.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
