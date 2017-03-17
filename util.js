//Utility Functions

var UIDcounter = 0;
function NewUID()
{
	UIDcounter += 1;
	return "SafeCrawlNewUID"+UIDcounter;
}


function getAbsolutePosition(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);
	
    return {
	top: top,
	left: left
    };
}