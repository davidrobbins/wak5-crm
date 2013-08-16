﻿//Creating the Lead classmodel.Lead = new DataClass("Leads");//Add Lead attributes.model.Lead.ID = new Attribute("storage", "long", "key auto");model.Lead.firstName = new Attribute("storage", "string");model.Lead.lastName = new Attribute("storage", "string", "btree");model.Lead.title = new Attribute("storage", "string");model.Lead.phone = new Attribute("storage", "string", "btree");model.Lead.fax = new Attribute("storage", "string");model.Lead.mobile = new Attribute("storage", "string", "btree");model.Lead.homePhone = new Attribute("storage", "string");model.Lead.emailAccnt = new Attribute("storage", "string");model.Lead.skypeAccnt = new Attribute("storage", "string");model.Lead.street = new Attribute("storage", "string");model.Lead.city = new Attribute("storage", "string", "btree");model.Lead.state = new Attribute("storage", "string", "btree");model.Lead.zip = new Attribute("storage", "string");model.Lead.country = new Attribute("storage", "string", "btree");model.Lead.company = new Attribute("storage", "string", "btree");model.Lead.converted = new Attribute("storage", "bool", "cluster");model.Lead.convertedDate = new Attribute("storage", "date");model.Lead.fullName = new Attribute("calculated", "string");model.Lead.changeOwnerAck = new Attribute("storage", "bool", "cluster");model.Lead.changeOwnerFlag = new Attribute("storage", "bool", "cluster");model.Lead.leadSource = new Attribute("storage", "string", "btree");model.Lead.industry = new Attribute("storage", "string", "btree");model.Lead.annualRevenue = new Attribute("storage", "number", "btree");model.Lead.leadStatus = new Attribute("storage", "string", "btree");model.Lead.rating = new Attribute("storage", "string", "btree");model.Lead.owner = new Attribute("relatedEntity", "User", "User"); // relation to the User classmodel.Lead.convertedContact = new Attribute("relatedEntity", "Contact", "Contact"); // relation to the Contact classmodel.Lead.convertedAcct = new Attribute("relatedEntity", "Account", "Account"); // relation to the Account classmodel.Lead.activityCollection = new Attribute("relatedEntities", "Activity", "lead", {reversePath:true});model.Lead.noteCollection = new Attribute("relatedEntities", "Note", "lead", {reversePath:true});//Class methods.model.Lead.methods = {};//model.Lead.methods.xxx.scope ="public";model.Lead.collectionMethods = {};model.Lead.collectionMethods.jqPlotLeadStatus = function() {	var jqPlotArray = [],		result = [],		leadStatusObj = {};		if (this.length === 0) return "Do not plot";		this.forEach(function(lead) {		if (typeof leadStatusObj[lead.leadStatus] === 'undefined') {			var count = 1;			leadStatusObj[lead.leadStatus] = count;		} else {			leadStatusObj[lead.leadStatus]++;		}	}); //end - forEach.		for(var prop in leadStatusObj){	    result.push([prop, leadStatusObj[prop]])	}		jqPlotArray.push(result);	return jqPlotArray;}; //end - jqPlotLeadStatus.model.Lead.collectionMethods.changeOwnerAcknowledgement = function(paramObj) {	var currentLeadsCollection = this; //"this" contains our current company collection.		currentLeadsCollection.forEach(function(oneLead) {		oneLead.changeOwnerAck = true;		oneLead.changeOwnerFlag = false;		oneLead.save();	});		return "The transfer of ownership has been acknowledged.";	}; //end - changeOwnerAck.model.Lead.collectionMethods.changeOwner = function(paramObj) {		if (!currentSession().belongsTo("Manager")) {return "You do not have permission to change the owner of a lead.";}		var currentLeadsCollection = this, //"this" contains our current company collection.		myUser = ds.User.find("ID = :1", paramObj.ownerID);			if (myUser !== null) {		//Note: Bug Report.		/*		paramObj.leadsSelectionArr.forEach(function(rowNum) { 			debugger;				currentLeadsCollection[rowNum].owner = myUser;			currentLeadsCollection[rowNum].save();		});		*/				var sessionRef = currentSession(); // Get session.		var promoteToken = sessionRef.promoteWith("Administrator"); //temporarily make this session Admin level.						var count = 0;		currentLeadsCollection.forEach(function(oneLead) {			if (paramObj.leadsSelectionArr.indexOf(count) !== -1) {								var recentItem = ds.RecentItem.find("dataClassName == :1 && entityKey == :2", "leads", oneLead.ID);				if (recentItem) {					recentItem.remove();				}								oneLead.changeOwnerFlag = true;				oneLead.changeOwnerAck = false;				oneLead.owner = myUser;				oneLead.save();							}			count++;		});				sessionRef.unPromote(promoteToken); //put the session back to normal. 	}		return "The owner has been changed.";};model.Lead.collectionMethods.jqPlotLeadStatus.scope = "public";model.Lead.collectionMethods.changeOwner.scope = "public";model.Lead.collectionMethods.changeOwnerAcknowledgement.scope = "public";//Calculated Attributes.model.Lead.fullName.onGet = function() {	return this.firstName + " " + this.lastName; };//Entity methods.model.Lead.entityMethods = {};model.Lead.entityMethods.convertLead = function(){	var recentItemArr = [];		this.convertedDate = new Date();	this.converted = true;		if (this.company) {		var newAccount = new ds.Account({			name: this.company,			industry: this.industry,			annualRevenue: this.annualRevenue,			website: this.website,			billingStreet: this.street,			billingCity: this.city,			billingState: this.state,			billingZip: this.zip,			billingCountry: this.country,			owner: this.owner		});		newAccount.save();	}			var newContact = new ds.Contact({		firstName: this.firstName,		lastName: this.lastName,		title: this.title,		owner: this.owner,		street: this.street,		city: this.city,		state: this.state,		zip: this.zip,		phone: this.phone,		mobile: this.mobile,		fax: this.fax,		homePhone: this.homePhone,		emailAccnt: this.emailAccnt,		skypeAccnt: this.skypeAccnt,		leadSource: this.leadSource	});	newContact.save();		if (newAccount) {		//account: newAccount		newContact.account = newAccount;		this.convertedAcct = newAccount;		newContact.save();	}		this.convertedContact = newContact;	this.save();		//Update Recent Items	var theRecentItem = ds.RecentItem.find("entityKey = :1 && dataClassName = :2", this.ID, "leads");	if (theRecentItem != null) {		theRecentItem.dataClassName = "contacts";		theRecentItem.entityKey = newContact.ID;		theRecentItem.title = "Contact: " + newContact.firstName + " " + newContact.lastName;		theRecentItem.save();				var recentItemsCollection = ds.RecentItem.query("ID > 0 order by sortOrder asc");		recentItemArr = recentItemsCollection.toArray("dataClassName, entityKey, title, sortOrder");	}		//Update Activities. Set the lead rel attr to null and create a link to contact.	this.activityCollection.forEach(function(activity) {		activity.lead = null;		activity.contact = newContact;	});		//Update Notes. Set the lead rel attr to null and create a link to contact.	this.noteCollection.forEach(function(note) {		note.lead = null;		note.contact = newContact;	});	return {contactID: newContact.ID, recentItemArray: recentItemArr};};model.Lead.entityMethods.convertLead.scope ="public";//Eventsmodel.Lead.events = {};/**/model.Lead.events.onValidate = function() {		var err;	/*	if (this.owner !== null  && this.firstName === null) {		err = {error: 8080, errorMessage: "You must enter a first name."};	}	*/	return err;};model.Lead.events.onInit = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		myUser = ds.User.find("ID = :1", myCurrentUser.ID);	if ((myCurrentUser !== null) && (myUser !== null)) {//if a user is logged in.				this.owner = myUser;	}		this.changeOwnerAck = false;	this.changeOwnerFlag = false;	this.converted = false;	this.leadSource = "-none-";	this.industry = "-none-";	this.leadStatus = "-none-";}; //end - onInit().model.Lead.events.onRestrictingQuery = function() {	var myCurrentUser = currentUser(), // we get the user of the current session.		sessionRef = currentSession(), // Get session.		result;			result = ds.Lead.createEntityCollection(); //default to empty collection.		if (sessionRef.belongsTo("Administrator") || sessionRef.belongsTo("Manager")) {		result = ds.Lead.all();	} else {		result = ds.Lead.query("owner.ID = :1", myCurrentUser.ID);	}		//result = ds.Lead.all(); //just for 3rd party libraries demo.	return result;} //end - onRestrictingQuery();