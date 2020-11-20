var dbug = !true;
var controls = {"sel1":null, "sel2":null, "convertBtn":null}
var selects = [];


function init () {
	if (dbug) console.log ("Initing");
	for (var control in controls) {
		if (dbug) console.log ("Looking for " + control + ".");
		controls[control] = document.getElementById(control);

		if (controls[control].tagName== "SELECT") {
			if (dbug) console.log (control + " is a select.  (prepping for converting).");
			selects.push(controls[control]);
		} else {
			if (dbug) console.log (control + " is a " + controls[control].tagName + ".");
			//controls[control].addEventListener("change", setVal, false);
		}

		if (control == "convertBtn") controls[control].addEventListener("click", convert, false);
	}
	if (dbug) console.log ("Done Initing");
} // End of init

function convert () {
	if (dbug) console.log ("Converting....");
	for (var i = selects.length-1; i >-1; i--) {
		if (dbug) console.log ("Doing select: " + i);
		var parentNode = selects[i].parentNode;
		var newInput = document.createElement("input");
		
		newInput.setAttribute("name", selects[i].getAttribute("name"));
		newInput.setAttribute("id", selects[i].getAttribute("id"));
		
		var opts = selects[i].querySelectorAll("option");
		var datalist = document.createElement("datalist");
		datalist.setAttribute("id", "datalist" + (i+1));
		
		var hasValues = false;
		for (var j = 0; j< opts.length; j++) {
			var newOpt = document.createElement("option");
			newOpt.innerHTML = opts[j].innerHTML;
			if (opts[j].hasAttribute("value")) {
				newOpt.setAttribute("value", opts[j].getAttribute("value"));
				hasValues = true;
			}
			datalist.appendChild(newOpt);
		}
		if (hasValues) {
			var newValInput = document.createElement("input");
			newValInput.setAttribute("name",  selects[i].getAttribute("name"));
			newValInput.setAttribute("id", selects[i].getAttribute("name") + i);
			newValInput.setAttribute("style", "position: absolute; left: -1000px");
			newInput.setAttribute("name", selects[i].getAttribute("name") + i);
			newInput.addEventListener("change", setVal, false);
			newInput.setAttribute("form", "akdskjajfkd");
		}

		
		newInput.setAttribute("list", "datalist" + (i+1));
		
		parentNode.appendChild(newInput);
		if (hasValues) parentNode.appendChild(newValInput);
		parentNode.appendChild(datalist);
		parentNode.removeChild(selects[i]);
	}
} // End of convert

function setVal(e) {
	var el = e.target;

	var optVal = el.value;
	console.log ("Set value: " + optVal + ".");
	var num, dlID, dl, name = null;
	name = el.getAttribute("name");
	dlID = el.getAttribute("list");
	if (dbug) console.log ("Looking for list with ID: " + dlID + ".");
	dl = document.getElementById(dlID);
	num = el.getAttribute("id").match(/\d+$/);
	if (num) {
		num = num.join();
		var opt, newValInput = null;
		opt = dl.querySelector("option[value='" + optVal + "']");
		if (opt) {
			optName = opt.innerHTML;
			newValInput = document.getElementById(name);
			if (newValInput) {
				newValInput.value = optVal;
				el.value = opt.innerHTML;
				newValInput.setAttribute("type", "hidden");
			} else {
				if (dbug) console.log ("Couldn't find newValInput: " + name + ".");
			}
		} else {
			if (dbug) console.log ("Didn't find option.");
		}



	}

}

document.addEventListener("DOMContentLoaded", init, false);
