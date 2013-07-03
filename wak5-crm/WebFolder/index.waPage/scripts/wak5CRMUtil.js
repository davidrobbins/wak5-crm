//Utility library for Wakanda CRM application.

var WAK5CRMUTIL = (function() {
	var wak5CRMUtilObj = {}; //This is the object we will return to create our module.
	
	wak5CRMUtilObj.metroRadioSelect = function(buttonRef) {
		var theRadioButton = $('#' + buttonRef),
			radioButtonsContainer = theRadioButton.parent();
			
		radioButtonsContainer.children().removeClass('selectedRadio');
		theRadioButton.addClass('selectedRadio');
	};
    	
    
    //Add event handlers for Radio Button Tab
    wak5CRMUtilObj.createMainMenubarEventHandler = function(optionsObject) {
    	$(document).off('click', '.metroRadio button');
		
    	$(document).on('click', '.metroRadio button', function (e) {
	   		WAK5CRMUTIL.metroRadioSelect($(this).attr('id'));
	   		//Did user click a Radio Tab Button?
	   		switch($(this).attr('id')) {
	   			case optionsObject.leadsButton :
				$$(optionsObject.signedInComponent).loadComponent('/components/leads.waComponent');
				break;
				
				case optionsObject.contactsButton :
				$$(optionsObject.signedInComponent).loadComponent('/components/contacts.waComponent');
				break;
				
				
	   		} //end - switch
		});
	};

	return wak5CRMUtilObj;
}()); //end - WAK5CRMUTIL.