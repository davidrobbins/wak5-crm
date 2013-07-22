
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var notesListContainer$ = getHtmlObj('notesListContainer'),
		inputNote$ = getHtmlObj('inputNote'),
		inputNoteTitle$ = getHtmlObj('inputNoteTitle'),
		inputNote = getHtmlId('inputNote'),
		inputNoteTitle = getHtmlId('inputNoteTitle'),
		addNoteContainer$ = getHtmlObj('addNoteContainer');
		
	console.log(inputNote);
	
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
	
		notesListContainer$.on('mouseenter', '.noteListItem', function (event) {
	   		$(this).addClass('noteSelected');
		});
		
		notesListContainer$.on('mouseleave', '.noteListItem', function (event) {
	   		$(this).removeClass('noteSelected');
		});
		
		
	// @region namespaceDeclaration// @startlock
	var cancelNoteButton = {};	// @button
	var saveNoteButton = {};	// @button
	var inputNote = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelNoteButton.click = function cancelNoteButton_click (event)// @startlock
	{// @endlock
		
		console.log(inputNote);
		
		
		//inputNote$.val("");
		//inputNoteTitle$.val("");
		//console.log(inputNote);
		//console.log(inputNoteTitle);
		
		//$$(inputNote).setValue();
		$$(inputNoteTitle).setValue();
		//inputNote$.css('height', 22);
		//addNoteContainer$.css('height', 42);
	};// @lock

	saveNoteButton.click = function saveNoteButton_click (event)// @startlock
	{// @endlock
		waf.sources.note.body = inputNote$.val();
		waf.sources.note.title = inputNoteTitle$.val();
		waf.sources.note.save({
			onSuccess: function(event) {
				inputNote$.val("");
				inputNoteTitle$.val("");
				inputNote$.css('height', 22);
				addNoteContainer$.css('height', 42);
				buildNoteGrid();
			}
		});
		
		
	};// @lock

	inputNote.focus = function inputNote_focus (event)// @startlock
	{// @endlock
		waf.sources.note.addNewElement();
		waf.sources.note.serverRefresh({
			onSuccess: function(event) {
				inputNote$.css('height', 120);
				addNoteContainer$.css('height', 182);
			}
		});
		
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelNoteButton", "click", cancelNoteButton.click, "WAF");
	WAF.addListener(this.id + "_saveNoteButton", "click", saveNoteButton.click, "WAF");
	WAF.addListener(this.id + "_inputNote", "focus", inputNote.focus, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
