
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var fileUpload1 = {};	// @fileUpload
// @endregion// @endlock

// eventHandlers// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		console.log(event);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
// @endregion
};// @endlock
