// Oliver Schneider
// April 16 2013


//OnChecked event handler
function OnClick(event)
{
	debugger;
	var id = event.srcElement.id;
	var idsplit = id.split("_");
	var target = idsplit[0];
	var vis = idsplit[1];
	localStorage[target]=vis;
}


//sets the right check boxes to being checked
function SetChecked()
{
	for(var i = 0; i < targets.length; i++)
	{
		//set value
		var selected_vis = localStorage[targets[i].name];
		if( selected_vis == undefined)
		{
			localStorage[targets[i].name] = "None";
			selected_vis = "None";
		}
		var checked_id = targets[i].name + "_" + selected_vis;
		document.getElementById(checked_id).checked = true;
	}
}



//
//Generate options table
//
var table = document.createElement("table");


//set up header row
var firstrow = document.createElement("tr");
var firstcol = document.createElement("td");
firstcol.innerHTML = "<b>Target</b>";
firstrow.appendChild(firstcol);
//set up "None" header
var secondcol = document.createElement("td");
secondcol.innerHTML="None";
firstrow.appendChild(secondcol);

//add visualization names
for(var visj in NewVisualization)
{
	var col = document.createElement("td");
	col.innerHTML = visj;
	firstrow.appendChild(col);
}
table.appendChild(firstrow);


//set up remaining rows (one for each target)
for(var i = 0; i < targets.length; i++)
{
	var row = document.createElement("tr");
	//first column - target name
	var firstcol = document.createElement("td");
	firstcol.innerHTML = targets[i].name;
	row.appendChild(firstcol);
	
	//second column - "None" visualization
	var secondcol = document.createElement("td");
	var newlabel = document.createElement("label");
	var rad = document.createElement("input");
	rad.type="radio";
	rad.name=targets[i].name;
	rad.value="None";
	rad.id=rad.name+"_"+rad.value;
	rad.onchange = OnClick;
	newlabel.appendChild(rad);
	secondcol.appendChild(newlabel);
	row.appendChild(secondcol);
	
	for(var visj in NewVisualization)
	{
		var col = document.createElement("td");
		var newlabel = document.createElement("label");
		var rad = document.createElement("input");
		rad.type="radio";
		rad.name=targets[i].name;
		rad.value=visj;
		rad.id=rad.name+"_"+rad.value;
		rad.onchange = OnClick;
		newlabel.appendChild(rad);
		col.appendChild(newlabel);
		row.appendChild(col);
	}
	
	table.appendChild(row);
	
}



document.getElementById("settingspanel").appendChild(table);

SetChecked();
//
//Options table generated!
//
