//Utility library for Wakanda CRM application.

var WAK5CRMUTIL = (function() {
	var wak5CRMUtilObj = {}; //This is the object we will return to create our module.
	
	
	//Private methods.
	function bind(context, methodName) {
	  return function() {
	  	return context[methodName].apply(context, arguments);
	  };
	}
	
	//M E T R O   R A D I O   B U T T O N   T A B   (S T A R T)
	//Let's make a Metro Radio Button Tab constructor.
	wak5CRMUtilObj.MetroRadioMenuBar = function (el) {
		this.el = document.getElementById(el);	
		//Implement a simple example of Observer pattern.
		this.subscribers =  {
			any: []
		};
		
		this.handleClick = function(ev) {
			var theRadioButton = $('#' + ev.currentTarget.id),
			radioButtonsContainer = theRadioButton.parent();
			
			radioButtonsContainer.children().removeClass('selectedRadio');
			theRadioButton.addClass('selectedRadio');
		 	this.publish({buttonElemId: ev.currentTarget.id}, "on select");
		};
		
		//Create event handler.
		$(this.el).off('click', 'button');
		$(this.el).on('click', 'button', bind(this, "handleClick"));
	};
	
	wak5CRMUtilObj.MetroRadioMenuBar.prototype.setSelectedMenuItem = function(num) {
	  var radioButtonsContainer$ = $(this.el),
	  childButtons$ = radioButtonsContainer$.children('button');
	  childButtons$.removeClass('selectedRadio');
	  childButtons$.eq(num).addClass('selectedRadio');
	  this.publish({buttonElemId: childButtons$.eq(num)["0"].id}, "on select");
	};
	
	//Observer Pattern methods.
	wak5CRMUtilObj.MetroRadioMenuBar.prototype.subscribe = function(fn, type) {
		type = type || 'any';
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn);
	}; //end - subscribe.
	
	wak5CRMUtilObj.MetroRadioMenuBar.prototype.visitSubscribers = function(action, arg, type) {
		var pubtype = type || 'any',
			subscribers = this.subscribers[pubtype],
			i,
			max = subscribers.length;
			
		for (i = 0; i < max; i += 1) {
			if (action === 'publish') {
				subscribers[i](arg);
			} else {
				if (subscribers[i] === arg) {
					subscribers.splice(i, 1);	
				}
			}
		} //end - for
	}; //end - visitSubscribers.
	
	wak5CRMUtilObj.MetroRadioMenuBar.prototype.publish = function(publication, type) {
		this.visitSubscribers('publish', publication, type);
	};
	//M E T R O   R A D I O   B U T T O N   T A B   (E N D)
	
	
	
	return wak5CRMUtilObj;
}()); //end - WAK5CRMUTIL.