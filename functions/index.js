const functions = require("firebase-functions");
const admin = require("firebase-admin");
//  const {user } = require("firebase-functions/lib/providers/auth");

admin.initializeApp();

//  http callable function
exports.giveNotification = functions.https.onCall((data, context) => {
  getDocumentNearBy(data.lat, data.long, 10).then((querySnapshot) => {
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
            sendToTopic("lahar", payload, messagingOptions);
      }
    });
  }).catch((error) => {
    console.error("Error getting documents: ", error);
  });
});

//  http callable function
exports.giveWorkers = functions.https.onCall((data, context) => {
  console.log("geopoint in constant");
  getDocumentNearBy(data.lat, data.long, 10).then((querySnapshot) => {
    console.log("these are the users :");
    let users;
    querySnapshot.forEach(function(doc) {
      const queryData = doc.data();
      console.log(doc.id, " =>", queryData.name);
      users += data.name + ":" + data.uid + ",";
      console.log(queryData);
      if (typeof queryData.fcm_token !== "undefined") {
        const payload = {
          notification: {
            title: "Portugal vs. Denmark",
            body: "great match!",
            clickAction: "FLUTTER_NOTIFICATION_CLICK",
          },
          data: {
            "Nick": "Mario",
            "Room": "PortugalVSDenmark",
            "docID": doc.id,
          },
        };
        const messagingOptions = {
          priority: "high",
        };
        //  be sure to change the below line before production
        admin.messaging().sendToTopic("lahar", payload, messagingOptions)
            .then(() => {
              return users;
            });
      }
    });
  }).catch((error) => {
    console.error("Error getting documents: ", error);
  });
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
  console.log(context.auth.id);
});
