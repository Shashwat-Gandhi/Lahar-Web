var firebase = app_firebase;
var db = firebase.firestore();

(function() {
   if(typeof flutter_bridge !== "undefined") {
       alert("something wrong here, is it not on a mobile phone...");
   }
   else {
       flutter_bridge.postMessage("send_location : LoadJobs");
   }
})()
function ClickedYes(bid) {
    window.location.replace('las.html');
}
function UpdateSkils() {
    window.location.replace('add_skills.html');
}

function LoadJobs(latitude, longitude) {
     //TODO : Get the data from the server and load them to the table
     var tr = document.createElement('tr');
     var td = document.createElement('td');
     var table = document.getElementById('table');
 
     const gJ = firebase.functions().httpsCallable('getJobs');
     gJ({lat : lt , long : lg}).then(result=> {
         var list = document.getElementById('worker-list');
         if (result.data != null) {
             if(result.data == "") {
                 console.log("no jobs around you")
             }
             else {
                 console.log(result.data);
                 var jobs = result.data.split(",");
                 for( var i of jobs) {
                     if (i != "" && i != null && i != " "){    
                         i.trim();
                         var worker = i.split(":");
                         console.log(i);
                         var li = document.createElement("li");
                         var btn = document.createElement("button");
                         btn.textContent = "call"
                         var btn2 = document.createElement("button");
                         btn2.textContent = "message"
                         li.textContent = worker[0];
                         li.append(btn);
                         li.append(btn2);
                         list.append(li);
                     }
                 }
             }
         }
         else {
             console.log("no one is around you");
         }
         
     })
}