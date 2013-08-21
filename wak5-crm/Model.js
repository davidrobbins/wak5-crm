
model = new DataStoreCatalog();

include("classes/utility.js");

include("classes/activity.js");
include("classes/user.js");
include("classes/lead.js");
include("classes/contact.js");
include("classes/account.js");
include("classes/recentItem.js");
include("classes/note.js");
include("classes/log.js");



/*
var dataClassNames = []; 
for (var theName in ds.dataClasses) { // put each datastore class of ds
 	dataClassNames.push (theName); // in the array
}

//model.Lead.collectionMethods.jqPlotLeadStatus = function() {
	
	
for (var i = 0, len = dataClassNames.length; i < len; i++) 
{
	model[dataClassNames[i]].collectionMethods.collectionEcho = function() {
		return "There are " + this.length + " entities in the " + dataClassNames[i] + " collection."
	};
}
*/

/*
var dataClassNames = [];
	
for (var property in model) {
    dataClassNames.push(property);
}

dataClassNames
*/