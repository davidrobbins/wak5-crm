
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login2 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	login2.logout = function login2_logout (event)// @startlock
	{// @endlock
		$$('mainComponent').loadComponent({path: '/components/splashScreen.waComponent'});
	};// @lock

	login2.login = function login2_login (event)// @startlock
	{// @endlock
		$$('mainComponent').loadComponent({path: '/components/dashboard.waComponent'});
		waf.sources.lead.all();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login2", "logout", login2.logout, "WAF");
	WAF.addListener("login2", "login", login2.login, "WAF");
// @endregion
};// @endlock
