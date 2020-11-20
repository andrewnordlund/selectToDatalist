// ==UserScript==
// @name     Convert Select to Datalist
// @version  1
// @grant    none
// @description Convert a select to a datalist
// @include     */selectToDatalist/*
// @include	    *cgi-bin/scdtic-ictdcs/add-page-error.aspx*
// @version     1
// @run-at      document-end
// ==/UserScript==

if (dbug) console.log ("convert::running");
var selects = null;
var datalists = [];
var dbug = !false;

selects = document.getElementsByTagName("select");
if (selects) {
  console.log ("convert::Got " + selects.length + " selects");
  
  for (let i = selects.length-1; i >-1; i--) {
    let opts = null;
    opts = selects[i].querySelectorAll("option");
    if (opts.length > 20 || selects[i].getAttribute("id") == "MainContent_Errors") {
			if (dbug) console.log ("convert::Doing select: " + i + " with " + opts.length + " options");
      
      // First get the select's parentnode, ID, and labelID
			var parentNode = selects[i].parentNode;
      var selID, label, labelID = null;
      if (selects[i].hasAttribute("id")) {
        selID = selects[i].getAttribute("id");
      } else {
        selID = "selects-" + i;
        if (document.getElementById(selID)) {
          // Find a new ID
          selID = "selects-blahblah-" + i;	// Imma gamble this ID won't exist on the page
        }
        selelects.setAttribute("id", selID);
      }
      
      if (dbug) console.log ("convert::Got sel.  Looking for label");
      label = parentNode.querySelector("label[for='" + selID + "']");
      if (label) {
        if (label.hasAttribute("id")) {
          labelID = label.getAttribute("id");
      	} else {
        	labelID = "sel-a" + i + "-Lbl";
        	label.setAttribute("id", labelID);
      	}
      } else {
        if (label.hasAttribute("aria-labelledby")) {
          labelID = label.getAttribute("aria-labelledby");
        }
      }
      
      if (dbug) console.log ("convert::Got label.  Now creating new input");
      // Create new input
			var newInput = document.createElement("input");
    	if (labelID) newInput.setAttribute("aria-labelledby", labelID);
      newInput.setAttribute("form", "jafafkjadfjkafd");
      newInput.setAttribute("aria-controls", selID);
           
      //newInput.setAttribute("width", 100);
      newInput.setAttribute("style", "display:block;min-width: 50em; max-width: 95%;");
      
      parentNode.insertBefore(newInput, selects[i]);
      
      // Create the datalist to mimic the select
			var datalist = document.createElement("datalist");
			datalist.setAttribute("id", "datalist" + (i+1));
		
    	// Populate it with options
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
      parentNode.appendChild(datalist);
      
      newInput.setAttribute("list", "datalist" + (i+1));
      newInput.addEventListener("change", setSelVal, false);
    		
		
    }
	}
}

function setSelVal (e) {
  
  var el = e.target;
  var optVal = el.value;
  let opts = null;
	if (dbug) console.log ("convert::Set value: " + optVal + ".");

  var selID, selectEl=null;
  selID = el.getAttribute("aria-controls");
  if (dbug) console.log ("selID: " + selID);
  selectEl = document.getElementById(selID);
  if (dbug) console.log ("selectEL: " + selectEl.getAttribute("id"));
  try {
		opts = selectEl.querySelectorAll("option");
  }
  catch (ex) {
    console.log ("Convert::setSelVal::Error: " + ex.message);
  }
  if (dbug) console.log ("convert::setSelVal::opts: " + opts + ".");
  
  var looking = true;
  if (dbug) console.log ("convert::setSelVal::Before I get looking there are " + opts.length + " options to look through.");
  for (let i = 0; i < opts.length && looking; i++) {
    if (opts[i].hasAttribute("value")) {
      if (dbug) console.log ("opts[" + i + "] has value (" + opts[i].value + ") and comparing to " + optVal + ".");
      
      if (opts[i].getAttribute("value") == optVal) 
      {
        if (dbug) console.log ("Found it by value!");
      
        selectEl.selectedIndex=i;
        looking = false;
        el.value = opts[i].text;
      }
      
  	} 
    else 
    {
      if (dbug) console.log ("opts[" + i + "] has text (" + opts[i].text + ")");
    	if (opts[i].text == optVal) 
      {
	      if (dbug) console.log ("Found it by text!");
  	    selectEl.selectedIndex = i;
    	  looking = false;
      	el.value = opts[i].text;
    	}
      
    } // End if if.opts.hasValue
    if (dbug) console.log (i +": Continuing on to the next opt with looking as " + looking + " opts.length = " + opts.length + ".");
  } // End of for.opts.length loop
  
} // End of setSelVal
