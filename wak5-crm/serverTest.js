﻿//Note: When you convert a lead make sure to set leadCollection to null./**///if (loginByPassword("wak5@wakanda.org", "wak5wak5")) {if (loginByPassword("dave@wakanda.org", "dave1dave")) {		/**/	var arClass = []; 	for (var vName in ds.dataClasses) { // put each datastore class of ds     	arClass.push (vName); // in the array    }        arClass						/*	var dataClassNames = [];		for (var property in model) {	    dataClassNames.push(property);	}		dataClassNames	*/			/*	var myObj = {a: 1, b: 2, c: 3}, myKeys = []; 	for (var property in myObj) {	    myKeys.push(property);	}	 	myKeys; //['a','b','c'];	*/				//ds.Log.all()			//ds.Lead.all()	//ds.Lead.query("changeOwnerFlag == :1", true)		/*	ds.Activity.all().remove();	ds.Account.all().remove();	ds.Contact.all().remove();	ds.Lead.all().remove();	ds.RecentItem.all().remove();	ds.Note.all().remove();	*/			/*	var dave = ds.User({email: "dave@wakanda.org"});		var daveLead = dave.leadCollection[0];	daveLead			var newNote = new ds.Note({		title: "Wakanday 2013 EU Hotels", 		body: "Is the staff staying at Holiday Inn this year. I need to check with Jean-Michel.", 		createDate: "7/3/2013",		owner: dave,		lead: daveLead	});	newNote.save();				var newNote = new ds.Note({		title: "Wakanday 2013 EU", 		body: "Lyle has not yet booked his flight. Let's make sure he has a non-stop on Virgin Airlines. They have the best food.", 		createDate: "7/3/2013",		owner: dave,		lead: daveLead	});	newNote.save();			var newNote = new ds.Note({		title: "Wakanday 2013 EU", 		body: "Lyle has not yet booked his flight. Let's make sure he has a non-stop on Virgin Airlines. They have the best food.", 		createDate: "7/3/2013",		owner: dave,		lead: daveLead	});	newNote.save();		var newNote = new ds.Note({		title: "Wakanday 2013 EU", 		body: "We need to think about the venue. Last year we had 2 - 3 hundred. Are we thinking it will be the same? Maybe 4 - 5 hundred.", 		createDate: "7/23/2013",		owner: dave,		lead: daveLead	});	newNote.save();		var newNote = new ds.Note({		title: "JS Everywhere", 		body: "Can people take the ferry to the island. Lyle is going to swim but I don't think this is an option for everyone.", 		createDate: "7/31/2013",		owner: dave,		lead: daveLead	});	newNote.save();		var newNote = new ds.Note({		title: "Javascript Ninja", 		body: "I have been reading this book by the author of jQuery..", 		createDate: "8/3/2013",		owner: dave,		lead: daveLead	});	newNote.save();		var newNote = new ds.Note({		title: "4D Wakanda Party", 		body: "Let's think about this for after JS Everywhere.", 		createDate: "8/3/2013",		owner: dave,		lead: daveLead	});	newNote.save();			newNote	*/				//ds.Note.all().remove()		/*	var dave = ds.User({email: "dave@wakanda.org"});	var daveLead = dave.leadCollection[0];	daveLead			var newNote = new ds.Note({		title: "Capitol Records", 		body: "When we go down to LA I have to call Huey and have him show me around.", 		createDate: "8/24/2013",		owner: dave,		lead: daveLead	});	newNote.save();		newNote	*/		/*	var newPriority = new ds.Priority({		title: "Lowest"	});	newPriority.save();		newPriority	*/			//ds.User.all()		//ds.Activity.all();	//ds.Account.all();	//ds.Contact.all();	//ds.Lead.all();	//ds.RecentItem.all();					//ds.User.all() //.remove();		//var dave = ds.User({email: "dave@wakanda.org"});//	var oneContact = dave.contactCollection[0];//	var oneLead = dave.leadCollection[0];	//var oneAccount = dave.accountCollection[0];		//oneAccount		/*	var newActivity = new ds.Activity({		subject: "Hire Andy Dont Care.", 		priority: "High", 		status: "Delayed",		due: "09/24/2013",		type: "Task",		owner: dave,		account: oneAccount	});	newActivity.save();	*/		/*	var newActivity = new ds.Activity({		subject: "Write CRM Application.", 		priority: "Normal", 		status: "In Progress",		due: "07/31/2013",		type: "Task",		owner: dave,		contact: oneContact	});	newActivity.save();	*/		//var newActivity = ds.Activity({subject: "Review McCarvell Invoicing App."});	//newActivity.remove();	//newActivity.type = "Task";	//newActivity.save();}//Create some Users./*var dave = new ds.User({	email: "dave@wakanda.org", 	password: "dave1dave", 	fullName: "David Robbins",	role: "Administrator"});dave.save();var tom = new ds.User({	email: "tom@wakanda.org", 	password: "tom1tom", 	fullName: "Tom Miller",	role: "Manager"});tom.save();var greg = new ds.User({	email: "greg@wakanda.org", 	password: "greg1greg", 	fullName: "Greg McCarvell",	role: "Employee"});greg.save();var wak5 = new ds.User({	email: "wak5@wakanda.org", 	password: "wak5wak5", 	fullName: "Administrator",	role: "Administrator"});wak5.save();*/