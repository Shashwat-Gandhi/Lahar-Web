var firebase = app_firebase;
db = firebase.firestore();

(function LoadListOfWorkersInArea() {
    if(typeof flutter_bridge !== 'undefined') {
        flutter_bridge.postMessage('send_location : getWorkers');
    }
    else {
       // alert('please open it on a mobile phone');
    }
})()
var s;
function getWorkers(lt,lg) {
    const gW = firebase.functions().httpsCallable('giveWorkers')
    gW({lat : lt , long : lg}).then(result=> {
        var list = document.getElementById('worker-list');
        if (result.data != null) {
            if(result.data == "") {
                console.log("no one around you")
            }
            else {
                console.log(result.data);
                s = result;
                var workers = result.data.split(",");
                for( var i of workers) {
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