$(document).ready(function(){

    let db = firebase.firestore();

    edit();
    function edit() {
        $("#saveButton").click(function() {
            let names = document.getElementsByTagName("INPUT");
            let name = document.getElementById("usr1").value;
            //console.log(names[0].value);
            for (let i = 0; i < names.length; i++) {
                if (names[i].value.replace(/\s+/g, '') != '') {
                    db.collection("employees").doc().set({
                        name: names[i].value.replace(/\s+/g, ''),
                        wage: 0
                    }, {merge: true});
                }
            }
            
                
            

        });
    }







});