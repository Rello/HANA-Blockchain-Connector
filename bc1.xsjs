//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;
//Implementation of GET call

function getBlockchainValues(){
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	
	// liest die httpdest config datei
	var dest = $.net.http.readDestination("XS-Test-Projekt.bc1", "bc1");
	var client = new $.net.http.Client();
	var req = new $.web.WebRequest($.net.http.GET, "/de/balance?active=1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F");
	
	client.request(req,dest);
	var response = client.getResponse();
	
	var h;
	
	 var myHeader = [], myBody;
	    //Cookies
	 	//var myCookies = [];
	    /*for(var c in response.cookies) {
	        myCookies.push(response.cookies[c]);
	    }*/
	    //Headers
	    for(h in response.headers) {
	    	if (response.headers.hasOwnProperty(h)) {
	    		myHeader.push(response.headers[h]);
	    	}	
	    }
	    //Body
	    if(response.body) {
	        try{
	             myBody = JSON.parse(response.body.asString());
	        }
	        catch(e){
	            myBody = response.body.asString();
	        }
		}
	        
	    var con = $.db.getConnection();
	    con.prepareStatement("SET SCHEMA \"BC1\"").execute();
	    var st = con.prepareStatement("INSERT INTO \"OUTBOUNDAPITABLE\" values(?,?,?)");
	    st.setBigInt(1, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].final_balance);
	    st.setBigInt(2, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].n_tx);
	    st.setBigInt(3, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].total_received);
	    st.execute();
	    con.commit();
	    con.close();

}

// Testfunktion für den Aufruf im Browser
//manuelles eintragen
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	
	// liest die httpdest config datei
	var dest = $.net.http.readDestination("XS-Test-Projekt.bc1", "bc1");
	var client = new $.net.http.Client();
	var req = new $.web.WebRequest($.net.http.GET, "/de/balance?active=1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F");
	
	client.request(req,dest);
	var response = client.getResponse();
	
	var h;
	
	 var myHeader = [], myBody;
	    //Cookies
	 	//var myCookies = [];
	    /*for(var c in response.cookies) {
	        myCookies.push(response.cookies[c]);
	    }*/
	    //Headers
	    for(h in response.headers) {
	    	if (response.headers.hasOwnProperty(h)) {
	    		myHeader.push(response.headers[h]);
	    	}	
	    }
	    //Body
	    if(response.body) {
	        try{
	             myBody = JSON.parse(response.body.asString());
	        }
	        catch(e){
	            myBody = response.body.asString();
	        }
	    }
	        
	    var con = $.db.getConnection();
	    con.prepareStatement("SET SCHEMA \"BC1\"").execute();
	    var st = con.prepareStatement("INSERT INTO \"OUTBOUNDAPITABLE\" values(?,?,?)");
	    st.setBigInt(1, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].final_balance);
	    st.setBigInt(2, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].n_tx);
	    st.setBigInt(3, myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].total_received);
	    st.execute();
	    con.commit();
	    
	    
	
	
	 return {"myResult": myBody["1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F"].n_tx};
}

function processRequest(){
		try {
		    switch ( $.request.method ) {
		        //Handle your GET calls here
		        case $.net.http.GET:
		            $.response.setBody(JSON.stringify(handleGet()));
		            break;
		            //Handle your POST calls here
		        //Handle your other methods: PUT, DELETE
		        default:
		            $.response.status = $.net.http.METHOD_NOT_ALLOWED;
		            $.response.setBody("Wrong request method");		        
		            break;
		    }
		    $.response.contentType = "application/json";	    
		} catch (e) {
		    $.response.setBody("Failed to execute action: " + e.toString());
		}
	
}
// Call request processing  
processRequest();
