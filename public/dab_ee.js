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
function sayYes(id) {
    // store the id in phone and go to confirm-work.html
    //confirm the work
    //go to diff page.
}
function UpdateSkils() {
    window.location.replace('add_skills.html');
}

function LoadJobs(lt, lg) {
     //TODO : Get the data from the server and load them to the table
     var table = document.getElementById('table');
 
     const gJ = firebase.functions().httpsCallable('getJobs');
     gJ({lat : lt , long : lg}).then(result=> {
         var list = document.getElementById('jobs-list');
         if (result.data != null) {
             if(result.data == "") {
                 console.log("no jobs around you")
             }
             else {
                 console.log(result.data);
                 jobs = result.data.jobs;
                 for( i in jobs) {
                     if (i != "" && i != null && i != " "){   
                        console.log(i);
                        var btn = document.createElement("button");
                        btn.setAttribute("onclick","sayYes('" + jobs[i].id + "')");
                        btn.textContent = "Say Yes";
                                            
                        var tr = document.createElement('tr');
                        var td = document.createElement('td');
                        var td2 = document.createElement("td");
                        td2.innerHTML = jobs[i].nbd + "<br>" + jobs[i].stn;
                        var td3 = document.createElement("td");
                        td3.append(btn);
                        td.innerHTML =jobs[i]["work"] + "<br>" + jobs[i]["details"];
                        table.append(tr);
                        tr.append(td);
                        tr.append(td2);
                        tr.append(td3);
                     }
                 }
             }
         }
         else {
             console.log("no one is around you");
         }
         
     })
}