(function() {
    //It checks if you are already authorised , and if so redirects you to the next page i.e. check_user.html 
    // to see if ur details are there already
    console.log('func ran');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in');
            console.log(app_firebase.auth().currentUser);
            window.location.replace('check_user.html');
        } else {
            console.log('logged out');
        }
    }) ;
})()

function Chosen(type) {
    if(!(typeof flutter_bridge !== 'undefined')) {
        alert('Open it on a mobile phone!');
    }
    else {
        flutter_bridge.postMessage('type_chosen: ' + type);
    }
    
    window.location.replace('auth.html');
}
