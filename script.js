(function init(){
	getFormJob();
}())

function getFormJob(callback) {   
  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'fields.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == 200) {
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

  	    		document.getElementById("form-job").innerHTML += "<div class='form_section'>" +
    	    																									"<label>" + response[key].request_fields[i].label + "</label>" +
    	    																									"<select class='input_form' id='" + response[key].request_fields[i].label + "'>" +
    	    																										"<option>" + values + "</option>" + 
										    	    															"</select>" +
									    	    													  	"</div>";
  	    	} else if(response[key].request_fields[i].type === "big_text") {
  	    			
  	    			document.getElementById("form-job").innerHTML += "<div class='form_section'>" + 
										    	        												 		"<label>" + response[key].request_fields[i].label + "</label>" + 
										    	        														"<textarea class='input_form' placeholder='" + response[key].request_fields[i].placeholder + "'></textarea>" + 
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

  	        	document.getElementById("form-job").innerHTML += "<div class='form_section'>" + 
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

function nextStep() {
	var checkbox = document.querySelectorAll("input[type=checkbox]"),
			sum = 0;
	for (a in checkbox) {
     if(checkbox[a].checked === true) {
        sum++
     } 
  }
  if (sum > 0) {
  	document.getElementById("form-job").className = 'hidden';
  	document.getElementById("nextstep").className = 'hidden';
  	document.getElementById("finish").classList.remove("hidden");
  	document.getElementById("first-step").classList.remove("active");
  	document.getElementById("second-step").className ="active";
  	getFormUser();
  } else {
  	alert("pelos menos um campo deve ser preenchido");
  }
}

function getFormUser() {
	var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'fields.json', true);
  xobj.onreadystatechange = function() {
  	console.log(xobj)
  	if (xobj.readyState == 4 && xobj.status === 200) {
  		var response = JSON.parse(xobj.responseText);
  		for (key in response) {
  			for(i in response[key].user_fields) {
  				document.getElementById("form-user-data").innerHTML += "<div class='form_section'>" + 
										    	        												 					"<label>" + response[key].user_fields[i].label + "</label>" + 
										    	        																 		"<input class='input_form' placeholder='" + response[key].user_fields[i].placeholder + "'>"
										    	        												 			 	"</div>";	
  			}
  		}
  	}
  }
  xobj.send(null);
}