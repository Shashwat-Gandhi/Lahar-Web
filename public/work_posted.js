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
    gW({lat : lt , long : lg}).then(users => {
        s = users.data;
        var list = document.getElementById('worker-list');
        if (users.data != null) {
            if(users.data == "Error : NOT_AUTH"){
                alert("You are not authorised, please sign in again!");
            }
            else {
                console.log(users.data);
                for( var i in users.data) {
                    if (i != "" && i != null && i != " "){   
                        console.log(i);
                        var li = document.createElement("li");
                        var btn = document.createElement("button");
                        btn.textContent = "call"
                        var btn2 = document.createElement("button");
                        btn2.textContent = "message"
                        li.innerHTML = users.data[i].name;
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