if(!(localStorage.getItem("accesstok") === null)){
    $("#status").html("Currently logged in.<br><button id=\"logout\">Logout</button>");
    
}
else{
    
    $("#status").html("Please login in by clicking the extension icon");
}

$('#logout').click(function(){
    
   if(confirm("Are you sure you want to logout"))
   {
       
       localStorage.removeItem("accesstok");
            localStorage.removeItem("uid");
                localStorage.removeItem("history");
                localStorage.removeItem("historycount");
       alert("Logged out sucessfully.Click on the extension icon to login again ");
   }
    
});