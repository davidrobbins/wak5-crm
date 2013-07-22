
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var notesListContainer$ = getHtmlObj('notesListContainer'),
		inputNote$ = getHtmlObj('inputNote'),
		addNoteContainer$ = getHtmlObj('addNoteContainer');
		
	
	function buildNoteGrid() {
		notesListContainer$.children().remove(); 
		
		ds.Note.all({
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
		buildNoteGrid();
		addNoteContainer$.css('height', 42);
	
	// @region namespaceDeclaration// @startlock
	var cancelNoteButton = {};	// @button
	var button1 = {};	// @button
	var saveNoteButton = {};	// @button
	var inputNote = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelNoteButton.click = function cancelNoteButton_click (event)// @startlock
	{// @endlock
		inputNote$.css('height', 22);
		addNoteContainer$.css('height', 42);
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		inputNote$.val();
		inputNote$.css('height', 22);
		addNoteContainer$.css('height', 42);
	};// @lock

	saveNoteButton.click = function saveNoteButton_click (event)// @startlock
	{// @endlock
		inputNote$.css('height', 22);
		addNoteContainer$.css('height', 42);
	};// @lock

	inputNote.focus = function inputNote_focus (event)// @startlock
	{// @endlock
		inputNote$.css('height', 120);
		addNoteContainer$.css('height', 182);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelNoteButton", "click", cancelNoteButton.click, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_saveNoteButton", "click", saveNoteButton.click, "WAF");
	WAF.addListener(this.id + "_inputNote", "focus", inputNote.focus, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
