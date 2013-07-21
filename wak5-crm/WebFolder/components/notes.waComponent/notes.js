
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var notesListContainer$ = getHtmlObj('notesListContainer');
	//WAK5CRMUTIL.noteListTemplateFn
	
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
	
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
