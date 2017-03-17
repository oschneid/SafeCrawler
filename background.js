//Oliver Schneider
//Background script for SafeCrawler
//April 16, 2013

//listen for messages from content scripts
chrome.runtime.onMessage.addListener(
	 function(request, sender, sendResponse)
	 {
		 //only receive messages from tabs/content scripts
		 if(sender.tab)
		 {
			if (request.request == "visualizations")
			{
				sendResponse(localStorage);
			}
		 }
	 });