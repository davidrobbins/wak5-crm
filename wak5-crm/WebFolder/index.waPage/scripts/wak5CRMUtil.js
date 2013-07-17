//Utility library for Wakanda CRM application.

var WAK5CRMUTIL = (function() {
	var wak5CRMUtilObj = {}; //This is the object we will return to create our module.
	
	
	//P R I V A T E   M E T H O D S   (S T A R T).
	function bind(context, methodName) {
	  return function() {
	  	return context[methodName].apply(context, arguments);
	  };
	}
	//P R I V A T E   M E T H O D S   (E N D).
	
	
	//M E S S A G E S
	wak5CRMUtilObj.messages = {
		leads: {
		
		}
	};
	
	//M A I N   M E N U B A R
	wak5CRMUtilObj.mainMenubarObj = {};
	
	//M E S S A G E   O B J E C T
	wak5CRMUtilObj.setMessage = function(text, displayTime, messageType) {
		//4c4c4c
		var displayTime = displayTime || 5000,
			messageType = messageType || "normal";
			
		//$$('messageText').setTextColor('#cc0000'); //e60000 4c4c4c
		switch(messageType) {
			case "normal" :
			$$('messageText').setTextColor('#4c4c4c'); 
			break;
			
			case "error":
			$$('messageText').setTextColor('#cc0000'); 
			break;
		}

		
		$$('messageText').setValue(text);
		$$('messageContainer').show();
		setTimeout(function() {$$('messageContainer').hide();}, displayTime);
	};
	
	
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
	
	wak5CRMUtilObj.MetroRadioMenuBar.prototype.setSelectedMenuItem = function(num, optionsObject) {
	  var radioButtonsContainer$ = $(this.el),
	  childButtons$ = radioButtonsContainer$.children('button');
	  childButtons$.removeClass('selectedRadio');
	  childButtons$.eq(num).addClass('selectedRadio');
	  this.publish({buttonElemId: childButtons$.eq(num)["0"].id, options: optionsObject}, "on select");
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
	
	
	
	//R E C E N T   I T E M S   (S T A R T)
	//Create New Recent Item
	wak5CRMUtilObj.newRecentItem = function(dataClassName, titleKey, titleValue, entityKey, targetContainer) {
		var recentItem = ds.RecentItem.newEntity(); // create the entity
		recentItem.dataClassName.setValue(dataClassName);
		recentItem.title.setValue(titleKey + titleValue); 
		recentItem.entityKey.setValue(entityKey);
		recentItem.sortOrder.setValue(0);
		
		ds.RecentItem.newRecentItem(dataClassName, titleKey, titleValue, entityKey, {
			onSuccess: function(event) {
				wak5CRMUtilObj.loadRecentItems(targetContainer, event.result);
			}
		});
	}; //end - newRecentItem.
	
	//Load Recent Items - Try Again!
	//N O T E :   R E F A C T O R   U S I N G   T E M P L A T E S. (July 11, 2013).
	wak5CRMUtilObj.loadRecentItems = function(targetContainer, recentItemsArr) {
		var myHTML,
			sessionCurrentUser = WAF.directory.currentUser(),
			theDataClass, theView, convertedString, 
			theTitle, theNewPath, $this, theConverted,
			recentItemsCollection, theEntityID, theSortOrder,
			theEntityKey;
		
		if (recentItemsArr == null) {
			waf.ds.RecentItem.all({
				orderBy: "sortOrder",
				onSuccess: function(event) {
					recentItemsCollection = event.entityCollection;
					if (recentItemsCollection.length > 0) {	
						myHTML = '<ul class="recentItemsList">';
						recentItemsCollection.forEach({
							onSuccess: function(evRecentItem) {	
								theSortOrder = evRecentItem.entity.sortOrder.getValue();
								theDataClass = evRecentItem.entity.dataClassName.getValue();
								theEntityKey = evRecentItem.entity.entityKey.getValue();
								theTitle = evRecentItem.entity.title.getValue(); 
								myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '"data-sortorder="' + theSortOrder + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
							}			
						});	
						myHTML += '</ul>';	
						
					} else {
						myHTML = 'No recent Items.';
					} //end if.
					$('#' + targetContainer).html(myHTML);	
				} //onSuccess
			}); 
			
		} else {
			//We have a recent items array.
			if (recentItemsArr.length > 0) {
				myHTML = '<ul class="recentItemsList">';
				
				recentItemsArr.forEach(function(recentItem) {
					theSortOrder = recentItem.sortOrder;
					theDataClass = recentItem.dataClassName;
					theEntityKey= recentItem.entityKey;
					theTitle = recentItem.title;
					myHTML += '<li><a data-class="' + theDataClass + '"data-entity="' + theEntityKey + '"data-sortorder="' + theSortOrder + '" class="recentItem" href="#">' + theTitle + '</a></li>'; //data-converted="' + convertedString + '"
				});
				myHTML += '</ul>';	
			} else {
				myHTML = 'No recent Items.';
			}
			$('#' + targetContainer).html(myHTML);	
		}
	}; //end - crmUtilObj.loadRecentItems
	
	//R E C E N T   I T E M S   E V E N T   H A N D L E R.
	//Call this once at Startup.
	wak5CRMUtilObj.setRecentItemsEventHandler = function() {
		var theSortOrder, theDataClass,  theEntityID,
			$this, theNewPath, theView;	
		$('.recentItem').live('click', function(e) {
			$this = $(this);
			theSortOrder = $this.data('sortorder');
		 	theDataClass = $this.data('class');
		 	theEntityID = $this.data('entity');
		 	theNewPath = 'components/' + theDataClass + '.waComponent';
			theView = "detail";	
			
		 	//$$('mainComponent_signedInComponent').loadComponent({path: theNewPath, userData: {view: theView}}); //Note: Refactor to not reference component directly.
		 	
		 	switch(theDataClass) {
				case "accounts":
				WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(3, {view: theView});
				waf.sources.account.selectByKey($this.data('entity'));
				break;
					
				case "contacts":
				WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(2, {view: theView});
				waf.sources.contact.selectByKey($this.data('entity'));
				break;
					
				case "leads":
				WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(1, {view: theView}); //Note: Refactor setSelectedMenuItem();
				waf.sources.lead.selectByKey($this.data('entity'));
				break;
			}
		}); // end - event handlers for recent items link.
	} //end - setRecentItemsEventHandler().
	//R E C E N T   I T E M S   (E N D)
	
	return wak5CRMUtilObj;
}()); //end - WAK5CRMUTIL.