﻿/**/if (loginByPassword("wak5@wakanda.org", "wak5wak5")) {		var dave = ds.User({email: "dave@wakanda.org"});	var daveLead = dave.leadCollection[0];	daveLead		var newNote = new ds.Note({		title: "JS EveryWhere", 		body: "We went to Treasure Island. Attendees will need to ride the ferry over.", 		createDate: "7/16/2013",		owner: dave,		lead: daveLead	});	newNote.save();		newNote			/*	ds.Activity.all().remove();	ds.Account.all().remove();	ds.Contact.all().remove();	ds.Lead.all().remove();	ds.RecentItem.all().remove();	ds.Note.all().remove()	*/		/*	var dave = ds.User({email: "dave@wakanda.org"});	var daveLead = dave.leadCollection[0];	daveLead			var newNote = new ds.Note({		title: "Capitol Records", 		body: "When we go down to LA I have to call Huey and have him show me around.", 		createDate: "8/24/2013",		owner: dave,		lead: daveLead	});	newNote.save();		newNote	*/		/*	var newPriority = new ds.Priority({		title: "Lowest"	});	newPriority.save();		newPriority	*/			//ds.User.all()		//ds.Activity.all();	//ds.Account.all();	//ds.Contact.all();	//ds.Lead.all();	//ds.RecentItem.all();					//ds.User.all() //.remove();		//var dave = ds.User({email: "dave@wakanda.org"});//	var oneContact = dave.contactCollection[0];//	var oneLead = dave.leadCollection[0];	//var oneAccount = dave.accountCollection[0];		//oneAccount		/*	var newActivity = new ds.Activity({		subject: "Hire Andy Dont Care.", 		priority: "High", 		status: "Delayed",		due: "09/24/2013",		type: "Task",		owner: dave,		account: oneAccount	});	newActivity.save();	*/		/*	var newActivity = new ds.Activity({		subject: "Write CRM Application.", 		priority: "Normal", 		status: "In Progress",		due: "07/31/2013",		type: "Task",		owner: dave,		contact: oneContact	});	newActivity.save();	*/		//var newActivity = ds.Activity({subject: "Review McCarvell Invoicing App."});	//newActivity.remove();	//newActivity.type = "Task";	//newActivity.save();}//Create some Users./*var dave = new ds.User({	email: "dave@wakanda.org", 	password: "dave1dave", 	fullName: "David Robbins",	role: "Administrator"});dave.save();var tom = new ds.User({	email: "tom@wakanda.org", 	password: "tom1tom", 	fullName: "Tom Miller",	role: "Manager"});tom.save();var greg = new ds.User({	email: "greg@wakanda.org", 	password: "greg1greg", 	fullName: "Greg McCarvell",	role: "Employee"});greg.save();var wak5 = new ds.User({	email: "wak5@wakanda.org", 	password: "wak5wak5", 	fullName: "Administrator",	role: "Administrator"});wak5.save();*/