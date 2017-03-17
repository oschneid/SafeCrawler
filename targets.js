//Targets source file for SafeCrawl
//Oliver Schneider, April 15, 2013


//Target data type definition
//name is a string
//list is a function that produces a list of HTML Elements
//vis is the
var Target = function(name, list)
{
	this.name = name;
	this.list = list;
};


//The main data structure of all targets
targets = new Array();




//All Links target
var AllLinks = new Target("AllLinks",
						  function() {return document.links;});
targets.push(AllLinks);


//All Inputs target
function AllInputsFn()
{
	var to_return = new Array();
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++)
	{
		to_return.push(inputs[i]);
	}
	
	inputs = document.getElementsByTagName("select");
	for (var i = 0; i < inputs.length; i++)
	{
		to_return.push(inputs[i]);
	}
	
	inputs = document.getElementsByTagName("button");
	for (var i = 0; i < inputs.length; i++)
	{
		to_return.push(inputs[i]);
	}
	
	return to_return;
}

var AllInputs = new Target("AllInputs",
						  AllInputsFn);
targets.push(AllInputs);


//All Text Fields target
var AllTextFields = new Target("AllTextFields",
				function(){
					var inputs = document.getElementsByTagName("input");
					var textfields = new Array();
					for (var i = 0; i < inputs.length; i++)
					{
						if (inputs[i].type == "text"
							|| inputs[i].type == "search"
							|| inputs[i].type == "searchText"
							|| inputs[i].type == "password")
						{
							   textfields.push(inputs[i]);
						}
					}
					var textareas = document.getElementsByTagName("textarea");
					for (var i = 0; i < textareas.length; i++)
					{
							   textfields.push(textareas[i]);
					}

							   
					return textfields;
				});
targets.push(AllTextFields);


//Random Links target
var RandomLinks = new Target("RandomLinks",
							function(){
							   var links = document.links;
							   var to_return = new Array();
							   for (var i = 0; i < links.length; i++)
							   {
								if (Math.random() < 0.3)
								{
									to_return.push(links[i]);
								}
							   }
							   return to_return;
							});
targets.push(RandomLinks);


//Arbitrary Links target
var ArbitraryLinks = new Target("ArbitraryLinks",
							 function(){
							 var links = document.links;
							 var to_return = new Array();
							 for (var i = 0; i < links.length; i++)
							 {
								var sum = 0;
								var str = links[i].toString();
								for (var s = 0; s < str.length; s++)
								{
									sum += str.charCodeAt(s);
								}
								
								if (sum%100 < 20)
								{
									to_return.push(links[i]);
								}
							 }
							 return to_return;
							 });
targets.push(ArbitraryLinks);



//Unencrypted inputs
var UnencryptedInputs = new Target("UnencryptedInputs",
								   function(){
									if ( (document.URL.substring(0,5) != "https")
										&& (document.URL.substring(0,4) != "ftps"))
										{
											return AllInputsFn();
										}
								   });
targets.push(UnencryptedInputs);




/*
//Unencrypted elements
var findUnencrypted = function()
{
	//look for links, frames/iframes, and scripts that are unencrypted
	var elements = new Array();
	for(var i = 0; i < document.links.length; i++)
	{
		if(document.links[i].href.substring(0,5) == "http"
		   && document.links[i].href.substring(0,6) != "https")
		{
			elements.push(document.links[i]);
		}
		
	}
	
	/*
	var frames = document.getElementsByTagName("frame");
	
	for(var i = 0; i < frames.length; i++)
	{
		if(frames.src.substring(0,6) != "https")
		{
			elements.push(frames[i]);
		}
		
	}
	
	var iframes = document.getElementsByTagName("iframe");
	
	for(var i = 0; i < iframes.length; i++)
	{
		if(iframes.src.substring(0,6) != "https")
		{
			elements.push(iframes[i]);
		}
		
	}
	
	var scripts = document.getElementsByTagName("script");
	
	for(var i = 0; i < scripts.length; i++)
	{
		if(scripts.src.substring(0,6) != "https")
		{
			elements.push(scripts[i]);
		}
		
	}
	
	return elements;
}

var Unencrypted = new Target("Unencrypted",
							 findUnencrypted);
targets.push(Unencrypted);
*/


