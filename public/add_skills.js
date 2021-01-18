var num_skills = 0;

const options_array = [];
var cb,label;
(function() {
    var firebase = app_firebase;
    var db = firebase.firestore();

    db.collection("jobs").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            var name = doc.get("name");
            options_array.push(name + '|' + name);
        }) 
        options_array.push('other|Other');
        CreateForm();
    })
    
})()
function CreateForm() {
    var form = document.createElement('form');  
    for (var i = 0; i < options_array.length;i++){
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = options_array[i].split('|')[1];
        cb.id = options_array[i].split('|')[0];
        form.appendChild(cb);
        var label = document.createElement('label');
        label.innerText = options_array[i].split('|')[1];
        var br = document.createElement('br');
        form.appendChild(label);    
        form.appendChild(br);
        if (i == options_array.length - 1) {
            cb.setAttribute('onchange','others_checkbox_clicked("last-second-br",this.id)');
            br.id = 'last-second-br';
        }
        br = document.createElement('br');
        form.appendChild(br);
    }

    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Next';
    button.id = 'submit_button';
    button.setAttribute('onclick','UploadSkills()');
    form.appendChild(button);
    console.log(button);
    document.getElementsByTagName("body")[0].appendChild(form); 
    console.log(form);
} 
function others_checkbox_clicked(bid,cid) {
    console.log('others clicked');
    var cb = document.getElementById(cid);
    if(cb.checked) {
        var b = document.getElementById(bid);
    
        var txt = document.createElement('input');
        txt.type = 'input';
        txt.id = 'others_details';
        txt.placeholder = 'Tell us more about the other ...';
    
        b.insertAdjacentElement('afterend',txt);
    
        var br = document.createElement('br');
        txt.insertAdjacentElement('afterend',br);
    }
    else {
        var oth = document.getElementById('others_details');
        oth.nextElementSibling.remove();
        oth.remove();
    }
   
}
function UploadSkills() {
    const all_skills = [];
    var cb;
    for(var i=0;i < options_array.length;i++) {
        cb = document.getElementById(options_array[i].split('|')[0]);
        if (cb.checked) {
            all_skills.push(cb.value);
        }
    }
    console.log(all_skills);
    var uid = app_firebase.auth().currentUser.uid;
    //create JSON 
    var json = {};
    for(var i =0 ;i < all_skills.length;i++) {
        if (all_skills[i] == 'Other' || all_skills[i] == 'other') {
            json['other'] = document.getElementById('others_details').value;
        }
        else{
            json['skill' + (i+1)] = all_skills[i];
        }
    }
    console.log(json);
    db = app_firebase.firestore();
    db.collection('registered/' + uid + '/professional_career').doc('jobs_you_do').set(json).then(function() {
        console.log('data added');
    });
}
