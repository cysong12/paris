$(document).ready(function(){

    let db = firebase.firestore();

    $("#viewButton").click(function() {
        let input1 = document.getElementById('datetimepicker1').value;
        let input2 = document.getElementById('datetimepicker2').value;
        console.log(input1, input2);
        let input1Obj = {
            year: Number(input1.substring(0, 4)),
            month: Number(input1.substring(5, 7)),
            day: Number(input1.substring(8, 10))
        }
        let input2Obj = {
            year: Number(input2.substring(0, 4)),
            month: Number(input2.substring(5, 7)),
            day: Number(input2.substring(8, 10))
        }

        console.log(input1Obj.year, input1Obj.month, input1Obj.day);
        console.log(input2Obj.year, input2Obj.month, input2Obj.day);

        if (checkValidDate(input1Obj, input2Obj)) {
            document.getElementById("checkValidP").style.display = "none";
            showDateData(input1Obj, input2Obj);
        }
        else {
            document.getElementById("checkValidP").style.display = "block";
            document.getElementById("checkValidP").innerHTML = "End date must be greater than or equal to start date!";
        }
        //let input2calc = 
        //if (input1 < input2)
        
    });

    function showDateData(input1, input2) {
        db.collection("employees").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                doc.ref.collection("ti
                }
                i++;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    function checkValidDate(input1, input2) {
        if (input2.year < input1.year) {
            return false;
        }
        if (input2.month < input1.month) {
            return false;
        }
        if (input2.day < input1.day) {
            return false;
        }
        return true;
    }

});