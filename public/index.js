(function() {
    //It checks if you are already authorised , and if so redirects you to the next page i.e. check_user.html 
    // to see if ur details are there already
    console.log('func ran');
    console.log(app_firebase.auth().currentUser);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('logged in');
            window.location.replace('check_user.html');
        } else {
            console.log('logged out');
        }
    }) ;
})()

function Chosen(type) {
    if(!(typeof SendType !== 'undefined')) {
        alert('Open it on a mobile phone!');
    }
    else {
        SendType(type);
    }
    
    window.location.replace('auth.html');
}
