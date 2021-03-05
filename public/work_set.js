var firebase = app_firebase;
db = firebase.firestore();

var docID = "xxxD";
function CancelWork() {
    var docRef = db.collection("jobs_unassigned_realtime").doc(docID);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        cancelled: true
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}