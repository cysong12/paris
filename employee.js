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
            let clicked = confirm("정보고 확실합니까? 이름이 변경됬거나 순서가 변경되는경우 전 정보가 지워질수도있습니다.");
            if (clicked === true) {
                for (let i = 0; i < names.length; i++) {        //no query since check doc exist
                        db.collection("employees").doc(String.fromCharCode(i+65)).get().then(function(doc) {
                            if (!doc.exists && names[i].value.replace(/\s+/g, '') !== '') {
                                console.log('here');
                                db.collection("employees").doc(String.fromCharCode(i+65)).set({
                                    name: names[i].value.replace(/\s+/g, ''),
                                    wage: 0
                                });
                                db.collection("employees").doc(String.fromCharCode(i+65)).collection("timetable").get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                      doc.ref.delete();
                                    });
                                  });
                            }
                            else if (doc.exists && names[i].value.replace(/\s+/g, '') === '') {
                                console.log('yellow');
                                db.collection("employees").doc(String.fromCharCode(i+65)).delete();
                            }
                            else if (doc.exists && doc.data().name !== names[i].value.replace(/\s+/g, '')) {
                                console.log('there');
                                db.collection("employees").doc(String.fromCharCode(i+65)).set({
                                    name: names[i].value.replace(/\s+/g, ''),
                                    wage: 0
                                });
                                db.collection("employees").doc(String.fromCharCode(i+65)).collection("timetable").get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                      doc.ref.delete();
                                    });
                                  });
                            }
                            else {
                                console.log('yonder');
                            }
                        });
                    //}
                }
                window.alert("저장이 완료되었습니다");      //timeout of 5 seconds
                
            }

        });
    }







});