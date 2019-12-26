$(document).ready(function(){

    let db = firebase.firestore();

    let name, label, wage;

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
                    label = document.getElementById("user" + j.toString());
                    label.innerText = doc.data().name;
                    wage = document.getElementById("usr" + j.toString());
                    wage.setAttribute("VALUE", doc.data().wage);
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
            let wages = document.getElementsByTagName("INPUT");
            //console.log(names[0].value);
            for (let i = 0; i < wages.length; i++) {
                if (wages[i].value.replace(/\s+/g, '') != '') {         //use trim (easier for deletion)
                    db.collection("employees").doc(String.fromCharCode(i+65)).set({
                        wage: wages[i].value.replace(/\s+/g, '')
                    }, {merge: true});
                }
            }
            window.alert("저장이 완료되었습니다");
        });
    }

});