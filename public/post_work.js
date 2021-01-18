(function LoadListOfWorks() {
    const work_list = document.getElementById('work-list');

    var firebase = app_firebase;
    db = firebase.firestore();
    db.collection('jobs').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var option = document.createElement("option");
            var name = doc.get("name");
            option.value = name;
            option.innerHTML = name;
            work_list.options.add(option);
        })
    })


})()