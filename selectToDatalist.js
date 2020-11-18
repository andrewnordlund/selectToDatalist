var dbug = true;
var controls = {"sel1":null, "sel2":null, "sel3":null, "sel4":null, "convertBtn":null}
var selects = [];


function init () {
	if (dbug) console.log ("Initing");
	for (var control in controls) {
		controls[control] = document.getElementById(control);

		if (controls[control].tagName== "SELECT") {
			if (dbug) console.log (control + " is a select.  (prepping for converting).");
			selects.push(controls[control]);
		} else {
			if (dbug) console.log (control + " is a " + controls[control].tagName + ".");
		}

		if (control == "convertBtn") controls[control].addEventListener("click", convert, false);
	}
} // End of init

function convert () {
	for (var i = selects.length-1; i >-1; i--) {
		if (dbug) console.log ("Doing select: " + i);
		var parentNode = selects[i].parentNode;
		var newInput = document.createElement("input");
		
		newInput.setAttribute("name", selects[i].getAttribute("name"));
		newInput.setAttribute("id", selects[i].getAttribute("id"));
		
		var opts = selects[i].querySelectorAll("option");
		var datalist = document.createElement("datalist");
		datalist.setAttribute("id", "datalist" + (i+1));
		
		for (var j = 0; j< opts.length; j++) {
			var newOpt = document.createElement("option");
			newOpt.innerHTML = opts[j].innerHTML;
			if (opts[j].hasAttribute("value")) newOpt.setAttribute("value", opts[j].getAttribute("value"));
			datalist.appendChild(newOpt);
		}
		
		newInput.setAttribute("list", "datalist" + (i+1));
		
		parentNode.appendChild(newInput);
		parentNode.appendChild(datalist);
		parentNode.removeChild(selects[i]);
   
  }} // End of convert

document.addEventListener("DOMContentLoaded", init, false);
