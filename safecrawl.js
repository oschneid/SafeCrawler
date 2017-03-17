//Visualizations source file for SafeCrawl
//Oliver Schneider, April 15, 2013
var visualizations = new Array();

//get settings
chrome.runtime.sendMessage({request:"visualizations"}, initPage);

		
function mainUpdateLoop()
{
	var ctx = globalcanvas.getContext('2d');
	ctx.clearRect(0,0,globalcanvas.width, globalcanvas.height);
	for(var i = 0; i < visualizations.length; i++)
	{
		visualizations[i].update();
	}
}

function initPage(target2vis)
{
	//initialize
	for(var i = 0; i < targets.length; i++)
	{
		var vis_name = target2vis[targets[i].name];
		if (vis_name in NewVisualization)
		{
			var elements = targets[i].list();
			for(var k = 0; k < elements.length; k++)
			{
				var new_vis = NewVisualization[vis_name]();
				new_vis.initialize(elements[k]);
				visualizations.push(new_vis);
			}
		}
	}
	setInterval(mainUpdateLoop, 1000/20);
}



