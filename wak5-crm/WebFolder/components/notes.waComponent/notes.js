
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var notesListContainer$ = getHtmlObj('notesListContainer'),
		inputNoteBody$ = getHtmlObj('inputNoteBody'),
		inputNoteTitle$ = getHtmlObj('inputNoteTitle'),
		inputNoteBodyRef = getHtmlId('inputNoteBody'),
		inputNoteTitleRef = getHtmlId('inputNoteTitle'),
		addNoteContainer$ = getHtmlObj('addNoteContainer');
		
	function buildNoteGrid(leadID) {
		notesListContainer$.children().remove(); 
		//waf.sources.note.query("lead.ID = :1", waf.sources.lead.getCurrentElement().ID.getValue());
		//ds.Note.all({
		ds.Note.query("lead.ID = :1", leadID, {
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
	}
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'notes';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		//console.log(data.userData.leadId)
		
		buildNoteGrid(data.userData.leadId);
		addNoteContainer$.css('height', 42);
	
		notesListContainer$.on('mouseenter', '.noteListItem', function (event) {
	   		$(this).addClass('noteSelected');
		});
		
		notesListContainer$.on('mouseleave', '.noteListItem', function (event) {
	   		$(this).removeClass('noteSelected');
		});
		
		
	// @region namespaceDeclaration// @startlock
	var cancelNoteButton = {};	// @button
	var saveNoteButton = {};	// @button
	var inputNoteBody = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelNoteButton.click = function cancelNoteButton_click (event)// @startlock
	{// @endlock
		
		//inputNote$.val("");
		//inputNoteTitle$.val("");
		//console.log(inputNoteBodyRef);
		//console.log(inputNoteTitleRef);
		
		$$(inputNoteBodyRef).setValue();
		$$(inputNoteTitleRef).setValue();
		inputNoteBody$.css('height', 22);
		addNoteContainer$.css('height', 42);
	};// @lock

	saveNoteButton.click = function saveNoteButton_click (event)// @startlock
	{// @endlock
		waf.sources.note.body = inputNoteBody$.val();
		waf.sources.note.title = inputNoteTitle$.val();
		waf.sources.note.createDate = new Date();
		waf.sources.note.lead.set(waf.sources.lead.getCurrentElement());
		
		waf.sources.note.save({
			onSuccess: function(event) {
				//inputNoteBody$.val();
				//inputNoteTitle$.val();
				$$(inputNoteBodyRef).setValue();
				$$(inputNoteTitleRef).setValue();
				inputNoteBody$.css('height', 22);
				addNoteContainer$.css('height', 42);
				buildNoteGrid(data.userData.leadId);
			}
		});
		
		
	};// @lock

	inputNoteBody.focus = function inputNoteBody_focus (event)// @startlock
	{// @endlock
	
		waf.sources.note.addNewElement();
		waf.sources.note.serverRefresh({
			onSuccess: function(event) {
				inputNoteBody$.css('height', 120);
				addNoteContainer$.css('height', 255);
			}
		});
		
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelNoteButton", "click", cancelNoteButton.click, "WAF");
	WAF.addListener(this.id + "_saveNoteButton", "click", saveNoteButton.click, "WAF");
	WAF.addListener(this.id + "_inputNoteBody", "focus", inputNoteBody.focus, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
