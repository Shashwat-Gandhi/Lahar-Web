var firebase = app_firebase;
db = firebase.firestore();


(function LoadListOfWorks() {
    const work_list = document.getElementById('work-list');    
    db.collection('jobs').doc("All Jobs").get().then((doc) => {
        var jobs = doc.data().jobs;
        jobs.forEach((job)=> {
            var option = document.createElement("option");
            option.value = job;
            option.innerHTML = job;
            work_list.options.add(option);
        })
    }).catch((error) => {
        console.log("Erorr : " + error);
    })


})()

function Post(){
    if (typeof flutter_bridge !== 'undefined') {
        flutter_bridge.postMessage("send_location : upload")
    }
    else {
        alert('please open it on a mobile phone');
    }
    
}
function upload(lt,lg) {
    const select_btn = document.getElementById('work-list'); 
    var work_str = select_btn.value;
    var work_details = document.getElementById('details').value;
    var stn = document.getElementById('street_name').value;
    var nbd = document.getElementById('neighborhood').value;
    db.collection('jobs_unassigned_realtime').add({
        employer : 'CvPu1BmnbHTkFqp7KjeahgEqfas2',
        work : work_str,
        timeCreated : new Date(),
        details : work_details,
        location : new firebase.firestore.GeoPoint(lt,lg),
        streetName : stn,
        neighborhood : nbd,
        cancelled : false,
        employee_on_hook : null,
        employees_rejected : null   
    }).then(function(docRef) {
        console.log("uploaded post success docID : " + docRef.id);
        const gW = firebase.functions().httpsCallable('giveNotification');
        gW({lat : lt , long : lg, docID : docRef.id, work : work_str,
            details : work_details, streetName : stn, neighborhood : nbd})
        .then(result=> {
            if (result.data != null) {
                console.log("result data : " + result.data);
            }
            else {
                console.log("it prolly failed.");
            }
        }).catch(function(error) {
            console.log("could not call function");
        });
    }).catch(function (error) {
        console.error('error uploading post ', error);
    });
}
function init() {
    flutter_bridge.postMessage("send_location : initMap");
}
var uluru;
var map;
var marker;

function initMap(lt, lg) {
    uluru = {lat : lt, lng : lg};
    map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
  });
  // The marker, positioned at Uluru
    marker = new google.maps.Marker({
    position: uluru,
    map: map,
    animation : google.maps.Animation.BOUNCE,
  });
}