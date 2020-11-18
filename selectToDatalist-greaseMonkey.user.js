// ==UserScript==
// @name     Convert Select to Datalist
// @version  1
// @grant    none
// @description Convert a select to a datalist
// @include     http://127.0.0.1/~andrewnordlund/selects/*
// @version     1
// @run-at      document-end
// ==/UserScript==

console.log ("convert::BLAHLABLABLA");
var selects = null;
var datalists = [];
selects = document.getElementsByTagName("select");
if (selects) {
  console.log ("Got " + selects.length + " selects");
  
  for (var i = selects.length-1; i >-1; i--) {
    console.log ("Doing select: " + i);
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
   
  }
}
