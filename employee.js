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
                if (doc.data().name !== '') {
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
                if (names[i].value.replace(/\s+/g, '') != '') {
                    db.collection("employees").doc(i.toString()).set({
                        name: names[i].value.replace(/\s+/g, ''),
                        wage: 0
                    });
                }
            }
            window.alert("저장이 완료되었습니다");
                
            

        });
    }







});