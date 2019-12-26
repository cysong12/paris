$(document).ready(function(){

    let db = firebase.firestore();

    let name, form;

    edit();
    readEmployeeDb();
    
    function readEmployeeDb() {
        let i = 0; 
        let j;
        db.collection("employees").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().name !== '' && doc.data().name !== 'undefined') {
                    j = i + 1;
                    form = document.getElementById("usr" + j.toString());
                    form.setAttribute('value', doc.data().name);
                }
                i++;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    function edit() {
        $("#saveButton").click(function() {
            let names = document.getElementsByTagName("INPUT");
            //console.log(names[0].value);
            for (let i = 0; i < names.length; i++) {
                //if (names[i].value.replace(/\s+/g, '') != '') {
                    db.collection("employees").doc(i.toString()).get().then(function(doc) {
                        if (!doc.exists && names[i].value.replace(/\s+/g, '') !== '') {
                            console.log('here');
                            db.collection("employees").doc(i.toString()).set({
                                name: names[i].value.replace(/\s+/g, ''),
                                wage: 0
                            });
                        }
                        else if (doc.exists && names[i].value.replace(/\s+/g, '') === '') {
                            console.log('yellow');
                            db.collection("employees").doc(i.toString()).delete();
                        }
                        else if (doc.exists && doc.data().name !== names[i].value.replace(/\s+/g, '')) {
                            console.log('there');
                            db.collection("employees").doc(i.toString()).set({
                                name: names[i].value.replace(/\s+/g, ''),
                                wage: 0
                            });
                        }
                        else {
                            console.log('yonder');
                        }
                    });
                //}
            }
            window.alert("저장이 완료되었습니다");      //timeout of 5 seconds
                
            

        });
    }







});