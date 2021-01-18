(function () {

    var firebase = app_firebase;
    var db = firebase.firestore();

    var uid = null;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage + ' : ' + errorCode);
            });
            if(!(typeof Senduid !== 'undefined')) {
                alert('Open it on a mobile phone!');
            }
            else {
                Senduid('' + uid);
            }
            console.log(uid)
            var docRef = db.collection("registered").doc(uid);
            docRef.get().then(function (snapshot) {
                if (snapshot.exists) {
                    console.log(snapshot.get("name"))
                    if(snapshot.get("name") == null){
                        console.log("data not exists");
                     //   window.location.replace("app://camera.request") ;        //this line goes to camera activity
                        window.location.replace('add_skills.html');
                    }
                    else {
                        console.log('data exists');
                        window.location.replace("dab_er.html");      //go to dashboard;
                    }
                } else {
                    console.log('data does not exist');
                    db.collection('registered').doc(uid).set({
                        name: null,
                        city: null,
                        emailaddress: null
                    });
                   // window.location.replace("app://camera.request")     //this line goes to camera activity
                    window.location.replace('add_skills.html');
                }
            });
        } else {
            uid = null;
            window.location.replace("index.html")
        }
    });

})()