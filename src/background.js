
if(localStorage.getItem("accesstok") === null)
   {
      allowAccess();
   }
function allowAccess()
       {
      alert("Please allow access to the app "); 
       chrome.tabs.create({url:"https://www.dropbox.com/1/oauth2/authorize?client_id=2augaxjh8mio3fk&response_type=token&redirect_uri=http://localhost"});
       }
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
   
    if (changeInfo.status === 'complete') {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var a = tabs[0].url;
        if(localStorage.getItem("accesstok") === null && (a.indexOf("localhost")>-1)){
            
            var param = a.split('&');
            
            if((param[0].indexOf("token")>-1) && (param[2].indexOf("uid")>-1))
            {
                
            var token = param[0].split('=');
            token = token[1];
             var uid = param[2].split('=');
            uid = uid[1];
            localStorage.setItem("accesstok",token);
            localStorage.setItem("uid",uid);
                localStorage.setItem("history","");
                localStorage.setItem("historycount",0);
              
    chrome.tabs.remove(tabs[0].id, function() { alert("Dropbox account added successfully.");});

                
            }
            
            
        }
        else if(!(localStorage.getItem("accesstok") === null)) {
                 
  
   
                     var check = a.split(":");
                     if(!(check[0]==="chrome") ){
                            var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
                         var formattedstr = localStorage.getItem("history")+"\n"+a+"     "+dd+"/"+mm+"/"+yyyy;
                    localStorage.setItem("history",formattedstr);
                      
                     var count = parseInt(localStorage.getItem("historycount"))+1;
                    
                         localStorage.setItem("historycount",count);
                         if(count>5)
                         {
                    getInfo();
                         }
    	
    }
        }
                         
        });
       
                      
    }
   
   
    
               
           });
    
 function writeToDropbox(text)
{
    var sendstring = text+localStorage.getItem("history");
   
     var xmlhttp = new XMLHttpRequest(); 
    
    	if (xmlhttp.readyState==4 && xmlhttp.status==200) { 
				localStorage.setItem("history","");
            localStorage.setItem("historycount",0);
             
                console.log(xmlhttp.responseText);
			}
    xmlhttp.open( "PUT", "https://api-content.dropbox.com/1/files_put/dropbox/historyninja.txt", true ); 


			// Set the headers so the transfer works 
			xmlhttp.setRequestHeader( "Authorization", "Bearer "+localStorage.getItem("accesstok") ); 
		var blob = new Blob([sendstring], { type: "text/plain" });
			
			xmlhttp.send(blob); 
    
    
        
		
        
            
            
            
            }
    
    
   

function getInfo()
{
    var xmlhttp = new XMLHttpRequest(); 

		// Handle the httprequest completion 
		xmlhttp.onreadystatechange = function(){ 
        if(xmlhttp.readyState==4 && xmlhttp.status==404){
            
            writeToDropbox("");
            
        }
			else if (xmlhttp.readyState==4 && xmlhttp.status==200) { 
				
              writeToDropbox(xmlhttp.response);
			}
        
            
            
            
            } 

			// Open the connection 
			xmlhttp.open( "GET", "https://api-content.dropbox.com/1/files/dropbox/historyninja.txt", true ); 


			// Set the headers so the transfer works 
			xmlhttp.setRequestHeader( "Authorization", "Bearer "+localStorage.getItem("accesstok") ); 
		
			xmlhttp.send(); 
	
	}
    
chrome.browserAction.onClicked.addListener(function ()
{                                         
                                             
   if(localStorage.getItem("accesstok") === null)
   {
       allowAccess();
       
   }
    else{
        alert("You have already registered your account.Check the options page for other details");
        
    }
                                             
                                         });