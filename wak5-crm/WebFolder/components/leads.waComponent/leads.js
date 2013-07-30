
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

//noteComponent 850x270  top: 173  left:20 right:20 bottom:5

//Notes: activitySmallComponent : /components/smallActivity.waComponent 912 x 470  top: 10 bottom: 10 right: 10 left: 10
function constructor (id) {
	var leadsListContainer = getHtmlId('leadsListContainer'),
		leadsDetailContainer = getHtmlId('leadsDetailContainer'),
		leadsConvertContainer = getHtmlId('leadsConvertContainer'),
		leadsNoAccessContainer = getHtmlId('leadsNoAccessContainer');
		
	/*
	var tabView1 = getHtmlId('tabView1'),
		firstNameInputfield = getHtmlId('firstNameInputfield'),
		accordion1 = getHtmlId('accordion1'),
		activitySmallComponent = getHtmlId('activitySmallComponent'),
		leadsTitle = getHtmlId('leadsTitle'),
		notesListContainer$ = getHtmlObj('notesListContainer'),
		inputNoteBody$ = getHtmlObj('inputNoteBody'),
		inputNoteTitle$ = getHtmlObj('inputNoteTitle'),
		inputNoteBodyRef = getHtmlId('inputNoteBody'),
		inputNoteTitleRef = getHtmlId('inputNoteTitle'),
		addNoteContainer$ = getHtmlObj('addNoteContainer');
	*/
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leads';
	// @endregion// @endlock
	
	/*
	function buildNoteGrid() {
		notesListContainer$.children().remove(); 
		
		
		ds.Note.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue(), {
			orderBy: "createDate desc",
			onSuccess: function(ev1) {
				ev1.entityCollection.forEach({
					onSuccess: function(ev2) {	
						noteData = 	{
							title:  	ev2.entity.title.getValue(),
							body: 		ev2.entity.body.getValue(),
							createDate: ev2.entity.createDate.getValue(),
							dataId: 	ev2.entity.ID.getValue()
						};
						notesListContainer$.append(WAK5CRMUTIL.noteListTemplateFn(noteData));
					}
				}); //ev1.entityCollection.forEach
			}
		});
	} //end - buildNoteGrid
	*/
	
		
	this.load = function (data) {// @lock
		/*
		addNoteContainer$.css('height', 42);
		
		notesListContainer$.on('mouseenter', '.noteListItem', function (event) {
	   		$(this).addClass('noteSelected');
		});
		
		notesListContainer$.on('mouseleave', '.noteListItem', function (event) {
	   		$(this).removeClass('noteSelected');
		});
		*/
		
		/*	
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(tabView1).selectTab(2);
			} else {
				$$(tabView1).selectTab(1);
			}
		}, 80);
		*/
		
		/*
		setTimeout(function() {
			if (data.userData.view == "detail") {
				$$(leadsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
				waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
			} 
		}, 400);
		*/
		
		/**/
		$comp.sourcesVar.leadTypeArr = [];
		$comp.sourcesVar.leadTypeArr.push({title: 'Open Leads'});
		$comp.sourcesVar.leadTypeArr.push({title: 'Converted Leads'});
		$comp.sources.leadTypeArr.sync();
		
		
				
	// @region namespaceDeclaration// @startlock
	var dataGrid2 = {};	// @dataGrid
	var newLeadActivityButton = {};	// @button
	var saveNoteButton = {};	// @button
	var inputNoteBody = {};	// @textField
	var cancelNoteButton = {};	// @button
	var button2 = {};	// @button
	var leadTypeArrEvent = {};	// @dataSource
	var submitConvertLeadButton = {};	// @button
	var convertLeadButton = {};	// @button
	var leadNewButton = {};	// @button
	var leadSaveButton = {};	// @button
	var leadCancelButton = {};	// @button
	var convertLeadCancelButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		
		waf.sources.activity.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		//waf.sources.note.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		//buildNoteGrid();
		
		if (waf.sources.lead.converted) {
			//$$(tabView1).selectTab(4);
			$$(leadsListContainer).hide();
			$$(leadsNoAccessContainer).show();
			
		} else {
			$$(leadsListContainer).hide();
			$$(leadsDetailContainer).show();
				
			//$$(accordion1).expand(1);
			//$$(leadsTitle).setValue("Lead Information: " + waf.sources.lead.fullName);
			//$$(tabView1).selectTab(2);
			//Add to recent items.
			WAK5CRMUTIL.newRecentItem("leads", "Lead: ", waf.sources.lead.firstName + " " + waf.sources.lead.lastName, waf.sources.lead.ID, 'mainComponent_recentItemsBodyContainer'); 
			// Note: Refactor so "mainComponent_recentItemsComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013)
		}
	};// @lock

	newLeadActivityButton.click = function newLeadActivityButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				
			}
		});
	};// @lock

	saveNoteButton.click = function saveNoteButton_click (event)// @startlock
	{// @endlock
		/*
		waf.sources.note.body = inputNoteBody$.val();
		waf.sources.note.title = inputNoteTitle$.val();
		waf.sources.note.lead.set(waf.sources.lead);
		
		waf.sources.note.save({
			onSuccess: function(event) {
				$$(inputNoteBodyRef).setValue();
				$$(inputNoteTitleRef).setValue();
				inputNoteBody$.css('height', 22);
				addNoteContainer$.css('height', 42);
				buildNoteGrid();
			}
		});
		*/
	};// @lock

	inputNoteBody.focus = function inputNoteBody_focus (event)// @startlock
	{// @endlock
		/*
		waf.sources.note.addNewElement();
		waf.sources.note.serverRefresh({
			onSuccess: function(event) {
				inputNoteBody$.css('height', 120);
				addNoteContainer$.css('height', 182);
			}
		});
		*/
	};// @lock

	cancelNoteButton.click = function cancelNoteButton_click (event)// @startlock
	{// @endlock
		/*
		$$(inputNoteBodyRef).setValue();
		$$(inputNoteTitleRef).setValue();
		inputNoteBody$.css('height', 22);
		addNoteContainer$.css('height', 42);
		*/
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		//$$(tabView1).selectTab(1);
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
		//$$(tabView2).selectTab(1);
		
		
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
		//$$(tabView1).selectTab(3);
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
						$$(leadsListContainer).hide();
						$$(leadsDetailContainer).show();
						
						//console.log("new lead saved");
						//console.log(ev2);
						//$$(tabView1).selectTab(2);
						//$$(firstNameInputfield).focus();
						//$$(leadsTitle).setValue("New Lead");
						//waf.sources.activity.setEntityCollection();
						//waf.sources.note.setEntityCollection();
						//notesListContainer$.children().remove(); 
					}
				});
			}
		});
	};// @lock

	leadSaveButton.click = function leadSaveButton_click (event)// @startlock
	{// @endlock
		//$$(tabView1).selectTab(1);
		
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
		//$$(tabView1).selectTab(1);
		/**/
		if (waf.sources.lead.isNewElement()) {
			//Bug Report: isNewElement() reports true for an entity that has been saved it is still the current entity.
			waf.sources.lead.removeCurrentReference();
		}
		
		$$(leadsDetailContainer).hide();
		$$(leadsListContainer).show();
		
		
	};// @lock

	convertLeadCancelButton.click = function convertLeadCancelButton_click (event)// @startlock
	{// @endlock
		
		//$$(tabView1).selectTab(2);
		$$(leadsConvertContainer).hide();
		$$(leadsDetailContainer).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newLeadActivityButton", "click", newLeadActivityButton.click, "WAF");
	WAF.addListener(this.id + "_saveNoteButton", "click", saveNoteButton.click, "WAF");
	WAF.addListener(this.id + "_inputNoteBody", "focus", inputNoteBody.focus, "WAF");
	WAF.addListener(this.id + "_cancelNoteButton", "click", cancelNoteButton.click, "WAF");
	WAF.addListener(this.id + "_button2", "click", button2.click, "WAF");
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
