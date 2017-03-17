//Visualizations source file for SafeCrawl
//Oliver Schneider, April 15, 2013


//Visualization data type definition
//name is a string
//initialize is the initialize function
//update is the update function
var Visualization = function(name, initialize, update)
{
	this.name = name;
	this.initialize = initialize;
	this.update = update;
};


//The main data structure of all visualizations
var NewVisualization = {};


//mouse data
var mousePos = {x:0, y:0};
function OnMouseMove(event)
{
	mousePos.x = event.clientX;
	mousePos.y = event.clientY;
}
document.onmousemove = OnMouseMove;

//a global canvas
var globalcanvas = document.createElement("canvas");
globalcanvas.id = "SafeCrawlGlobalCanvas";
globalcanvas.setAttribute('class', 'globalcanvas');

//globalcanvas.setAttribute('class', 'globalcanvas');
//globalcanvas.style.top = 0;
//globalcanvas.style.left = 0;
//globalcanvas.style.height = 1;
//globalcanvas.style.width = 1;
//globalcanvas.width = document.body.clientWidth;
//globalcanvas.height = document.body.clientHeight;
globalcanvas.width = window.innerWidth;
globalcanvas.height = window.innerHeight;

//add image for Evil visualization
if ( (document.URL.substring(0,5) != "https")
	&& (document.URL.substring(0,4) != "ftps"))
{

	evil_image1 = document.createElement("img");
	evil_image1.id = "SafeCrawler_EvilImage1";
	evil_image1.src = chrome.extension.getURL("images/EvilDude1.png");
	evil_image1.style.opacity=0;
	evil_image2 = document.createElement("img");
	evil_image2.id = "SafeCrawler_EvilImage2";
	evil_image2.src = chrome.extension.getURL("images/EvilDude2.png");
	evil_image2.style.opacity=0;
}
	
	
//This makes visualizations.js play nice with the popup menu
if(document.readyState === "interactive" || document.readyState === "complete")
{
	document.body.appendChild(globalcanvas);
	//document.body.appendChild(evil_image1);
//	document.body.appendChild(evil_image2);
}






//this function is for testing purposes only and is now obsolete.
/*
//Oscillating Box target
var OscBoxInit = function(element)
{
	this.id = NewUID();
	this.ownerid = element.id;
	this.owner = element;
	
	this.top = 0;
	this.left = 0;
	this.height = 100;
	this.width = 100;
	
	
	var div = document.createElement("div");
	div.id = this.id;
	
	//div.setAttribute('id', 'myfloatingdiv');
	div.setAttribute('class', 'overlay');
	document.body.appendChild(div);
};

var OscBoxUpdate = function()
{
	var abs_pos = getAbsolutePosition(this.owner);
	
	
	this.top = abs_pos.top - window.pageYOffset;
	this.left = abs_pos.left - window.pageXOffset;
	
	
	var currentDate  = new Date();
	var offset_x = -5 + 10*Math.sin(currentDate.getTime()/100);
	var offset_y = -5 + 10*Math.cos(currentDate.getTime()/100);
	
	document.getElementById(this.id).style.left=""+(this.left+ offset_x)+"px";
	document.getElementById(this.id).style.top=""+(this.top + offset_y)+"px";
};

NewVisualization['OscBox'] = function() { return new Visualization("OscBox", OscBoxInit, OscBoxUpdate)};
*/





//VISUALIZATION:
//
//Blinking Eyes
//
//
var EyeDisplayInit = function(element)
{
	this.id = NewUID();
	this.ownerid = element.id;
	this.owner = element;
	this.randomoffset = Math.random()*3000;
	this.radius = 7;
	this.eyespacing=13;
	this.pupilradius = 2;
	this.irisradius = 4;
	
};

var EyeDisplayUpdate = function()
{
	var abs_pos = getAbsolutePosition(this.owner);
	this.top = abs_pos.top - window.pageYOffset;
	this.left = abs_pos.left - window.pageXOffset;
	
	if(abs_pos.top == 0 && abs_pos.left == 0)
	{
		return;
	}
	
	this.height = 1;
	this.width = 1;
	
	
	var ctx = globalcanvas.getContext("2d");
	
	
	var blink = false;
	var currentDate  = new Date();
	var currentTime = currentDate.getTime() - this.randomoffset;
	if ((currentTime % 3000) < 100)
	{
		blink = true;
	}
	//if (((currentTime % 2000) > 300) && ((currentTime % 2000) < 400))
	//{
	//	blink = true;
	//}

	
	if (blink)
	{
		ctx.fillStyle="#000000";
		ctx.beginPath();
		ctx.moveTo(this.left-7,this.top);
		ctx.lineTo(this.left+20, this.top);
		ctx.stroke();
	}
	else
	{
	
		//whites of the eyes
		ctx.fillStyle="#FFFFFF";
		ctx.beginPath();
		ctx.arc(this.left,this.top,this.radius,0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.left+this.eyespacing,this.top,this.radius,0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();

		var farthestLeftPupil = this.left-this.radius+this.irisradius;
		var farthestRightPupil = this.left+this.radius-this.irisradius;
		var farthestUpPupil = this.top-this.radius+this.irisradius;
		var farthestDownPupil = this.top+this.radius-this.irisradius;
		
		var pupilX = Math.min(Math.max(farthestLeftPupil, mousePos.x), farthestRightPupil);
		var pupilY = Math.min(Math.max(farthestUpPupil, mousePos.y), farthestDownPupil);

		
		//irises
		ctx.fillStyle="#9999FF";
		ctx.beginPath();
		ctx.arc(pupilX,pupilY,this.irisradius,0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(pupilX+this.eyespacing,pupilY,this.irisradius,0, 2*Math.PI);
		ctx.fill();

		
		//pupils
		ctx.fillStyle="#000000";
		ctx.beginPath();
		ctx.arc(pupilX,pupilY,this.pupilradius,0, 2*Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(pupilX+this.eyespacing,pupilY,this.pupilradius,0, 2*Math.PI);
		ctx.fill();
	}
	
};

NewVisualization['EyeDisplay'] = function() { return new Visualization("EyeDisplay", EyeDisplayInit, EyeDisplayUpdate)};



//VISUALIZATION:
//
//Flies
//
//
var FlyDisplayInit = function(element)
{
	this.id = NewUID();
	this.ownerid = element.id;
	this.owner = element;
	this.width = Math.max(element.clientWidth, 25);
	this.height = Math.max(element.clientHeight, 25);
	this.randomoffset = Math.random()*400;
	this.randomscale = Math.random()*100+50;
	this.leftoffset = Math.random()*this.width;
	this.topoffset = Math.random()*this.height;
};

var FlyDisplayUpdate = function()
{
	var abs_pos = getAbsolutePosition(this.owner);
	this.top = abs_pos.top - window.pageYOffset;
	this.left = abs_pos.left - window.pageXOffset;
	
	if(abs_pos.top == 0 && abs_pos.left == 0)
	{
		return;
	}
	
	
	var ctx = globalcanvas.getContext("2d");
	
	
	var currentDate  = new Date();
	var wingOffset = Math.sin(currentDate.getTime()/3);
	var yOffset = 3*Math.sin((currentDate.getTime()-this.randomoffset)/50);
	var xOffset = 3*Math.sin((currentDate.getTime()-this.randomoffset)/this.randomscale);
	
	
	var x = this.left+xOffset+this.leftoffset;
	var y = this.top + yOffset+this.topoffset;
		
	//fly body
	ctx.fillStyle="#000000";
	ctx.beginPath();
	ctx.arc(x,y,2,0, 2*Math.PI);
	ctx.fill();
	
	//fly wings
	//left
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x-3-wingOffset, y-3-wingOffset/3);
	ctx.stroke();

	//right
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x+3+wingOffset, y-3-wingOffset/3);
	ctx.stroke();

	
};

NewVisualization['FlyDisplay'] = function() { return new Visualization("FlyDisplay", FlyDisplayInit, FlyDisplayUpdate)};



//VISUALIZATION:
//
//MultiFlies
//
//
var MultiFliesInit = function(element)
{
	this.id = NewUID();
	this.ownerid = element.id;
	this.owner = element;
	this.nFlies = Math.random() * 3 + 2;
	this.flies = new Array();
	for(var i = 0; i < this.nFlies; i++)
	{
		var curFlyVis = NewVisualization['FlyDisplay']();
		curFlyVis.initialize(element);
		this.flies.push(curFlyVis);
	}
};

var MultiFliesUpdate = function()
{
	for(var i = 0; i < this.flies.length; i++)
	{
		this.flies[i].update();
	}
};

NewVisualization['MultiFlies'] = function() { return new Visualization("MultiFlies", MultiFliesInit, MultiFliesUpdate)};



//VISUALIZATION:
//
//Evil Snickering person
//
//
var EvilInit = function(element)
{
	this.id = NewUID();
	this.ownerid = element.id;
	this.owner = element;
	this.width = 16;
	this.eyeOffsetX = 1;
	this.eyeOffsetY = 0;
	this.eyeWidth = 6;
	this.eyeHeight = 6;
	this.snickerLength=100;//ms
	this.randomoffset = Math.random()*2*this.snickerLength;
};

var EvilUpdate = function()
{
	
	if ( (document.URL.substring(0,5) != "https")
		&& (document.URL.substring(0,4) != "ftps"))
	{
		var abs_pos = getAbsolutePosition(this.owner);
		this.top = abs_pos.top - window.pageYOffset;
		this.left = abs_pos.left - window.pageXOffset;
		
		if(abs_pos.top == 0 && abs_pos.left == 0)
		{
			return;
		}
		
		var ctx = globalcanvas.getContext("2d");
		
		var currentDate  = new Date();
		var currentTime = currentDate.getTime() - this.randomoffset;
		if ((currentTime % (2*this.snickerLength)) < this.snickerLength)
		{
	//		ctx.drawImage(document.getElementById("SafeCrawler_EvilImage1"), this.left, this.top);
			ctx.drawImage(evil_image1, this.left, this.top);
		}
		else
		{
	//		ctx.drawImage(document.getElementById("SafeCrawler_EvilImage2"), this.left, this.top);
			ctx.drawImage(evil_image2, this.left, this.top);
		}
	}
	
};

NewVisualization['Evil'] = function() { return new Visualization("Evil", EvilInit, EvilUpdate)};



