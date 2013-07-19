﻿
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var login2 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock

		WAK5CRMUTIL.setRecentItemsEventHandler();
		waf.sources.lead.declareDependencies('owner');
		waf.sources.contact.declareDependencies('owner');
		waf.sources.account.declareDependencies('owner');
		
		//$$('messageContainer').hide();
		
		if (WAF.directory.currentUser() === null) {
			/*
		 	$$('blackContainer').show();
			$('#headerContainer').animate({
	            backgroundColor: "#7f7f7f"
	        }, 600);
	        $('#headerTitle').css("color", "#4c4c4c");
	        
			$$('mainComponent').loadComponent({path: '/components/splashScreen.waComponent'});
			*/
		} else {
			/*
			$$('blackContainer').hide();
			$('#headerContainer').animate({
	            backgroundColor: "#7f7f7f"
	        }, 600);
	        $('#headerTitle').css("color", "#ffffff");
	        
			$$('mainComponent').loadComponent({path: '/components/dashboard.waComponent'});
			waf.sources.lead.all();
			*/
		}
	};// @lock

	login2.logout = function login2_logout (event)// @startlock
	{// @endlock
		waf.sources.lead.setEntityCollection();
		waf.sources.contact.setEntityCollection();
		waf.sources.account.setEntityCollection();
		waf.sources.activity.setEntityCollection();
		
		//$$('blackContainer').show();
		$$('container1').show();
		/*
		$('#headerContainer').animate({
            backgroundColor: "#7f7f7f"
        }, 900);
        */
        $('#headerContainer').css("backgroundColor", "#e5e5e5");
        $('#headerTitle').css("color", "#7f7f7f");
        
		$$('mainComponent').loadComponent({path: '/components/splashScreen.waComponent'});
	};// @lock

	login2.login = function login2_login (event)// @startlock
	{// @endlock
		//$$('blackContainer').hide();
		$$('container1').hide();
		/*
		$('#headerContainer').animate({
            backgroundColor: "#7f7f7f"
        }, 900);
        */
        $('#headerContainer').css("backgroundColor", "#7f7f7f");
        $('#headerTitle').css("color", "#ffffff");
        
		$$('mainComponent').loadComponent({path: '/components/dashboard.waComponent'});
		//waf.sources.lead.all();
		waf.sources.lead.query("converted == false");
		waf.sources.contact.all();
		waf.sources.account.all();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login2", "logout", login2.logout, "WAF");
	WAF.addListener("login2", "login", login2.login, "WAF");
// @endregion
};// @endlock
