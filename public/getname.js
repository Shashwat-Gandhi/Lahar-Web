function fromFlutter(message) {
    document.getElementById("getname").innerHTML = message;

    if(typeof flutter_bridge !== 'undefined')
        flutter_bridge.postMessage('nothing : nothing');
    else {
        console.log('you are not on mobile phone');
    }
}
function createacc() {
    var firebase = app_firebase;
    var db = firebase.firestore();
}
