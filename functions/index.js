const functions = require("firebase-functions");
const admin = require("firebase-admin");
//  const {user } = require("firebase-functions/lib/providers/auth");

admin.initializeApp();

//  http callable function
exports.giveWorkers = functions.https.onCall((data, context) => {
  if (context.auth != null) {
    console.log("geopoint in constant");
    return getDocumentNearBy(data.lat, data.long, 10).then((querySnapshot) => {
      console.log("these are the users :");
      const users = {};
      let i = 0;
      querySnapshot.forEach(function(doc) {
        const queryData = doc.data();
        console.log(doc.id, " =>", queryData.name);
        console.log(queryData);
        users[i]= {name: queryData.name,
          uid: doc.id};
        i += 1;
      });
      return users;
    }).catch((error) => {
      console.error("Error getting nearby users: ", error);
    });
  } else {
    return "Error : NOT_AUTH";
  }
});

/**
 * Adds two numbers together.
 * @param {number} latitude the latitude.
 * @param {number} longitude The longitude.
 * @param {number} distance the distance around it.
 * @return {Promise<any>} the users in the area.
 */
function getDocumentNearBy(latitude, longitude, distance) {
  // ~1 mile of lat and lon in degrees
  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - (lat * distance);
  const lowerLon = longitude - (lon * distance);

  const greaterLat = latitude + (lat * distance);
  const greaterLon = longitude + (lon * distance);

  const lesserGeopoint = new admin.firestore.GeoPoint(lowerLat, lowerLon);
  const greaterGeopoint = new admin.firestore.GeoPoint(greaterLat, greaterLon);

  const docRef = admin.firestore().collection("registered");
  const query = docRef.where("location", ">=", lesserGeopoint)
      .where("location", "<=", greaterGeopoint);

  //  let users = "";
  console.log("will do query get");
  return query.get();
}


exports.job = functions.firestore.
    document("jobs_unassigned_realtime/{docID}").onUpdate((change, context) => {
    // Get an object representing the current document
      // const newValue = change.after.data();

      const payload = {
        data: {
          "work_taken": "true",
          "employee": "newValue.employee",
          "docID": change.after.id,
        },
      };
      const messagingOptions = {
        priority: "high",
      };
      // ...therefore update the document as.
      return admin.messaging().
          sendToTopic("lahar", payload, messagingOptions);
    });

//  location wise query jobs aur fir dab me bhej dega
exports.getJobs = functions.https.onCall((data, context) => {
  if (context.auth != null) {
    console.log(context.auth.uid + " : context auth id");
    console.log("context auth is : " + context.auth);
  } else {
    console.log("lol auth is empty");
  }
  const result = {jobs: {}};
  return getJobsNearby(data.lat, data.long, 10).then((querySnapshot) => {
    console.log("yeah");
    let i = 0;
    querySnapshot.forEach(function(doc) {
      const queryData = doc.data();
      console.log(doc.id, " =>", queryData.name);
      console.log(queryData);
      result.jobs[i] = {work: queryData.work,
        details: queryData.details,
        id: doc.id,
        nbd: queryData.neighborhood,
        stn: queryData.streetName};
      i++;
    });
    console.log(result);
    return result;
  }).catch((error) => {
    console.log("error : " + error);
    return error;
  });
});

/**
 * Adds two numbers together.
 * @param {number} latitude the latitude.
 * @param {number} longitude The longitude.
 * @param {number} distance the distance around it.
 * @return {Promise<any>} the users in the area.
 */
function getJobsNearby(latitude, longitude, distance) {
  // ~1 mile of lat and lon in degrees
  const lat = 0.0144927536231884;
  const lon = 0.0181818181818182;

  const lowerLat = latitude - (lat * distance);
  const lowerLon = longitude - (lon * distance);

  const greaterLat = latitude + (lat * distance);
  const greaterLon = longitude + (lon * distance);

  const lesserGeopoint = new admin.firestore.GeoPoint(lowerLat, lowerLon);
  const greaterGeopoint = new admin.firestore.GeoPoint(greaterLat, greaterLon);

  const docRef = admin.firestore().collection("jobs_unassigned_realtime");
  const query = docRef.where("cancelled", "==", false)
      .where("assigned", "==", false)
      .where("location", ">=", lesserGeopoint)
      .where("location", "<=", greaterGeopoint);

  //  let users = "";
  console.log("will do query get");
  return query.get();
}
exports.giveNotification = functions.firestore
    .document("jobs_unassigned_realtime/{job}")
    .onCreate((snap, context) => {
      const data = snap.data();

      // eslint-disable-next-line max-len
      return getDocumentNearBy(data.location.latitude, data.location.longitude, 10)
          .then((querySnapshot) => {
            querySnapshot.forEach(function(doc) {
              const queryData = doc.data();
              console.log(doc.id, " =>", queryData.name);
              if (typeof queryData.fcm_token !== "undefined") {
                const payload = {
                  notification: {
                    title: data.work,
                    body: data.details,
                    clickAction: "FLUTTER_NOTIFICATION_CLICK",
                  },
                  data: {
                    "Work": data.work,
                    "Details": data.details,
                    "docID": data.docID,
                    "StreetName": data.streetName,
                    "Neighborhood": data.neighborhood,
                  },
                };
                const messagingOptions = {
                  priority: "high",
                };
                //  be sure to change the below line before production
                return admin.messaging().
                    sendToTopic("lahar", payload, messagingOptions)
                    .then((result) => {
                      console.log("notification sent : " + result);
                      return "notification sent";
                    }).catch((error) => {
                      console.log("error sending notificaiton : " + error);
                      return error;
                    });
              }
            });
          }).catch((error) => {
            console.error("Error getting documents: ", error);
            return error;
          });
    });
