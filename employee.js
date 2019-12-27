let uid = localStorage.getItem("userId");
console.log(uid);
if (uid !== "gDquuD8SSHRtpQLVpAt9fTt886r2" && uid !== "lhVx5eeIyvdSwtpeU9D9Jx8DZDw1" && uid !== null) {
    document.getElementById("authorized").style.display = "none";
    document.getElementById("login").style.display = "none";
  } else if (uid === null) {
    document.getElementById("authorized").style.display = "none";
  }
  //gDquuD8SSHRtpQLVpAt9fTt886r2
  //lhVx5eeIyvdSwtpeU9D9Jx8DZDw1
  else {
    document.getElementById("securityDiv").style.display = "none";
  }

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
            let clicked = confirm("정보가 확실합니까? 이름이 변경됬거나 순서가 변경되는경우 전 정보가 지워질수도있습니다.");
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
                tempAlert();
                setTimeout(function() {
                    window.alert("저장이 완료되었습니다");
                }, 2500);
            }

        });
    }
    function tempAlert(){
        let el = document.createElement("div");
        
        el.innerHTML = "저장중...";
        setTimeout(function(){
            el.parentNode.removeChild(el);
        }, 2000);
        document.body.appendChild(el);
    }






});