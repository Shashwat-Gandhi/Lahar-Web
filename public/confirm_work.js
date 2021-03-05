var firebase = app_firebase;
db = firebase.firestore();

var doc_id;
(function() {
    if(typeof flutter_bridge !== 'undefined') {
        flutter_bridge.postMessage("send_notification_docID : GetWorkDetails");
    }
    else {
        alert('how did you find this? You have been reported!');
    }
})()

function GetWorkDetails(docID) {
    doc_id = docID;
    // if docID exists then open
    // else go to dashboard
    const usersRef = db.collection('jobs_unassigned_realtime').doc(docID);

    usersRef.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists) {
            const data = docSnapshot.data();
            console.log(data);
            //Work : Dish Washing<br>
            //Address : Sector 3,<br>
            //        Malviya Nagar<br></br>
            var b = document.getElementById("work-details");
            b.innerHTML = "<pre>Work : " + data.work + "<br>Details : " + data.details + "<br>Address : " + data.streetName + "<br>          " + data.neighborhood + "<br>TimeCreated : " + new Date(data.timeCreated * 1000) + "<br></pre>";
        } else {
            console.log("does not exsit");
        }
    });
}



function confirm(v) {
    if (v == 0) {
        //said no, go to dashboard
        window.location.replace("dab_ee.html");
    }
    else if(v == 1){
        //said yes, confirm the work
        //TODO : remove the notification from other people
                // remove it from the "realtime" database

    var docRef = db.collection("jobs_unassigned_realtime").doc(doc_id);
    return db.runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(docRef).then((doc) => {
            var data = doc.data();
            if (data.employee != null && data.employee != "") {
                throw "Sorry! The work was taken!";
            }
            transaction.update(docRef, { employee: firebase.auth().currentUser });
        });
    }).then(() => {
        console.log("Congrats! Job taken");
    }).catch((error) => {
        console.log("connection failed: ", error);
    });
    }
}