(function init(){
	loadJSON();
}())

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'fields.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var response = JSON.parse(xobj.responseText) 
          	for (key in response) {
          	    for (i in response[key].request_fields) {
          	    	if ( response[key].request_fields[i].allow_multiple_value === false) {
          	    		var values = ( () => {
          	    			var out = "";
          	    			for (var e in response[key].request_fields[i].values) {
          	    				out += "<option>" + response[key].request_fields[i].values[e] + "</option>";
          	    			}
          	    			return out;
          	    		})();

          	    		document.getElementById("form").innerHTML += "<div class='form_section'>" +
          	    														"<label>" + response[key].request_fields[i].label + "</label>" +
          	    														"<select id='" + response[key].request_fields[i].label + "'>" +
          	    															"<option>" + values + "</option>" + 
          	    														"</select>" +
          	    													  "</div>";
          	    	} else {
          	        	var values = ( () => {
          	        	    var out = "";
          	        	    for(var e in response[key].request_fields[i].values){
          	        	        out += 	"<li class='item_check'>" + 
          	        	        			"<input type='checkbox' id='" + response[key].request_fields[i].values[e] + "'>" +
          	        	        			"<label for='" + response[key].request_fields[i].values[e] + "'>" 
          	        	        				+ response[key].request_fields[i].values[e] + 
          	        	        			"</label>" + 
          	        	        		"</li>";
          	        	    }
          	        	    return out;
          	        	})();

          	        	document.getElementById("form").innerHTML += "<div class='form_section'>" + 
          	        													"<label>" + response[key].request_fields[i].label + "</label>" + 
          	        													"<ul>" + values + "</ul>" + 
          	        												 "</div>";	
          	        }   
          	    }
          	}
        }
    };
    xobj.send(null);  
}