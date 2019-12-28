let uid = localStorage.getItem("userId");
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

    let name, label, wage;
    let store;

    let queryStringURL = decodeURIComponent(window.location.search);
    let tempVar = queryStringURL.split('?');
    if (tempVar[1] === undefined) {
        store = "store1";
    } else {
        store =tempVar[1];
    }

    document.getElementById("storeName").innerHTML = document.getElementById(store).innerHTML;

    edit();
    readEmployeeDb();

    $("#store1").click(function() {
        store = "store1";
        document.getElementById("storeName").innerHTML = document.getElementById("store1").innerHTML;
        window.location.href = "rate.html?" + store;
    });
    $("#store2").click(function() {
        store = "store2";
        document.getElementById("storeName").innerHTML = document.getElementById("store2").innerHTML;
        window.location.href = "rate.html?" + store;
    });
    $("#store3").click(function() {
        store = "store3";
        document.getElementById("storeName").innerHTML = document.getElementById("store3").innerHTML;
        window.location.href = "rate.html?" + store;
    });

    function readEmployeeDb() {
        let i = 0; 
        let j;
        db.collection(store).get().then(function(querySnapshot) {
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
                    db.collection(store).doc(String.fromCharCode(i+65)).set({
                        wage: wages[i].value.replace(/\s+/g, '')
                    }, {merge: true});
                }
            }
            tempAlert();
            setTimeout(function() {
                window.alert("저장이 완료되었습니다");
            }, 2500);
        });
    }
    function tempAlert(){
        let el = document.createElement("div");
        el.setAttribute("style","position:relative;margin:10px 0px 0px 0px;background-color:grey;color:white;");
        el.innerHTML = "저장중...";
        setTimeout(function(){
            el.parentNode.removeChild(el);
        }, 2000);
        document.body.appendChild(el);
    }

});