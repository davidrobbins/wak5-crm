﻿new ds.Log({title: "Start the Create Log Record Daemon."}).save(); function onconnect(msg) {	// In a SharedWorker, we get the communication port in evt.ports[0]    var thePort = msg.ports[0];	thePort.onmessage = function(messageEvt)    {    	// The message is in the "data" member of the argument		var message = messageEvt.data;       	// The caller is supposed to have set a "what" property, to tell us what		// he wants us to do. We dispatch the message and act accordingly.		// Notice that the caller can set more properties in messageEvt.    	    	switch(message.what)    	{    		case 'createLogRecord':			new ds.Log({title: message.title}).save(); 			break;			case "stop":			new ds.Log({title: "Stop the Create Log Record Daemon."}).save(); 			thePort.postMessage({responseType: "close"});			close();			break;			default:			thePort.postMessage({responseType: "default"});			break;	    	} //end - switch(message.what).	} //end - thePort.onmessage().} //onconnect