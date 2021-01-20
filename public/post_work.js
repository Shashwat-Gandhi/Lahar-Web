var firebase = app_firebase;
db = firebase.firestore();

(function LoadListOfWorks() {
    const work_list = document.getElementById('work-list');    
    db.collection('jobs').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var option = document.createElement("option");
            var name = doc.get("name");
            option.value = name;
            option.innerHTML = name;
            work_list.options.add(option);
        })
    })


})()

function AskMobile() {
    //Method 2 :
    // Send a message to android that will then execute the real function to post the work
    if (typeof SendPostMessage !== 'undefined'){
		console.log(typeof SendPostMessage);
        SendPostMessage.postMessage("ok");
    }
    else {
        alert('Please open it on mobile phone');
    }
}
function Post(lat,long){
    if (lat == 'error') {
        //Could not get the location due to some reason
        alert(long);
    }
    else {
        const select_btn = document.getElementById('work-list'); 
        var work_str = select_btn.value;
        var work_details = document.getElementById('details').textContent;
        
        db.collection('jobs_unassigned_realtime').doc().set({
            employer : 'CvPu1BmnbHTkFqp7KjeahgEqfas2',
            work : work_str,
            timeCreated : new Date(),
            details : work_details,
            position : new firebase.firestore.GeoPoint(lat,long)
        }).then(function() {
            console.log("uploaded post success");
        }).catch(function (error) {
            console.error('error uploading post ', error);
        });

    }
}
