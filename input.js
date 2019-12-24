$(document).ready(function(){

    let db = firebase.firestore();

    let name, label, wage;

    save();
    readEmployeeDb();

    let names = document.getElementsByClassName("user");

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
});