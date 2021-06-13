var firebase = app_firebase;
var db = firebase.firestore();

function SubmitInfo() {
    var m_name = document.getElementById('name').value;
    var m_email = document.getElementById('email').value;
    var m_city = document.getElementById('city').value;

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            db.collection("registered").doc(uid).set({
                name : m_name,
                email : m_email,
                city : m_city
            }).then(()=> {console.log("info updated successfully")}).catch((error)=>{
                console.log(error.message + ' : ' + error.code);
            });
        } else {
            uid = null;
            window.location.replace("index.html")
        }
    });
}
