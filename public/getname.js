function fromFlutter(message) {
    document.getElementById("getname").innerHTML = message;

    if(typeof Senduid !== 'undefined')
        Senduid.postMessage('I rec. the message');
    else {
        console.log('you are not on mobile phone');
    }
}
function createacc() {
    var firebase = app_firebase;
    var db = firebase.firestore();
}
