$(document).ready(function(){

    let db = firebase.firestore();

    $("#viewButton").click(function() {
        let del = document.getElementById("table");
        while (del.hasChildNodes()) {
            del.removeChild(del.lastChild);
        }
        let input1 = document.getElementById('datetimepicker1').value;
        let input2 = document.getElementById('datetimepicker2').value;
        console.log(input1, input2);
        let input1Obj = {
            year: Number(input1.substring(0, 4)),
            month: Number(input1.substring(5, 7)),
            monthName: switchMonth(Number(input1.substring(5, 7))),
            day: Number(input1.substring(8, 10)),
            dayName: input1.substring(11, 14)
        }
        let input2Obj = {
            year: Number(input2.substring(0, 4)),
            month: Number(input2.substring(5, 7)),
            monthName: switchMonth(Number(input2.substring(5, 7))),
            day: Number(input2.substring(8, 10)),
            dayName: input2.substring(11, 14)
        }

        console.log(input1Obj.year, input1Obj.month, input1Obj.day, input1Obj.dayName);
        console.log(input2Obj.year, input2Obj.month, input2Obj.day, input2Obj.dayName);

        if (checkValidDate(input1Obj, input2Obj)) {
            document.getElementById("checkValidP").style.display = "none";
            showDateData(input1Obj, input2Obj);
        }
        else {
            document.getElementById("checkValidP").style.display = "block";
            document.getElementById("checkValidP").style.color = "red";
            document.getElementById("checkValidP").innerHTML = "날짜 순서를 다시 확인해주시길 바랍니다.";
            
        }
        //let input2calc = 
        //if (input1 < input2)
        
    });
    function createTable() {
        let div = document.getElementById("table");
        let table = document.createElement("TABLE");
        let thead = document.createElement("THEAD");
        let tr = document.createElement("TR");
        let th1 = document.createElement("TH");
        let th2 = document.createElement("TH");
        let th3 = document.createElement("TH");
        let th4 = document.createElement("TH");
        let tbody = document.createElement("TBODY");
        table.className = "table table-striped";
        div.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr);
        th1.innerHTML = "이름";
        th2.innerHTML = "시급";
        th3.innerHTML = "시간";
        th4.innerHTML = "급여";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tbody.setAttribute("ID", "tbody");
        table.appendChild(tbody);
    }

    function showDateData(input1, input2) {
        let startDateRange = input1.dayName + input1.monthName + input1.day + input1.year;
        let endDateRange = input2.dayName + input2.monthName + input2.day + input2.year;
        let startDate = new Date(input1.year, input1.month - 1, input1.day);
        let endDate = new Date(input2.year, input2.month - 1, input2.day);
        let dates = getDates(startDate, endDate);   //array of dates (Date obj) between start and end
        let durationArr = [];
        let dayIncomeArr = [];

        createTable();
        let tbody = document.getElementById("tbody");

        //get each employee's work duration and dayIncomes of date range into arrays
        db.collection("employees").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                let tr = document.createElement("TR");
                let tdname = document.createElement("TD");
                let tdduration = document.createElement("TD");
                tdduration.setAttribute("class", "tdduration");
                let tdwage = document.createElement("TD");
                let tddayincome= document.createElement("TD");
                tddayincome.setAttribute("class", "tddayincome");

                tbody.appendChild(tr);
                tdname.innerHTML = doc.data().name;
                tr.appendChild(tdname);
                tdwage.innerHTML = '₩' + doc.data().wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                tr.appendChild(tdwage);
                tr.appendChild(tdduration);
                tr.appendChild(tddayincome);
                doc.ref.collection("timetable").where("dateCode", ">=", queryDateFormat(startDate))
                .where("dateCode", "<=", queryDateFormat(endDate)).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        tdduration.innerHTML = Number(tdduration.innerHTML) + Number(doc.data().duration);
                        tddayincome.innerHTML = Number(tddayincome.innerHTML) + Number(doc.data().dayIncome);
                    });
                    tdduration.innerHTML = Math.floor(tdduration.innerHTML / 60).toString() + '시간 ' + (tdduration.innerHTML % 60).toString() + '분';
                    if (tddayincome.innerHTML != '') {
                        tddayincome.innerHTML = '₩' + tddayincome.innerHTML.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        tddayincome.innerHTML = '₩0';
                    }
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            });
        });
    }

    function queryDateFormat(date) {
        let month;
        if (date.getMonth() + 1 <= 9) {
            month = '0' + (date.getMonth() + 1).toString();
        } else {
            month = (date.getMonth() + 1).toString();
        }
        let day;
        //console.log(typeof(date.getDate()));  number
        if (date.getDate() <= 9) {
            day = '0' + (date.getDate()).toString();
        } else {
            day = (date.getDate()).toString();
        }
        console.log(date.getFullYear() + month + day);
        return Number(date.getFullYear().toString() + month + day);
    }
    function docDateFormat(date) {
        let monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];
        let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let day;
        if (date.getDate() <= 9) {
            day = '0' + date.getDate();
        } else {
            day = date.getDate();
        }
        return dayNames[date.getDay()] + monthNames[date.getMonth()] + day + date.getFullYear()
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    
    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }

    function checkValidDate(input1, input2) {
        let check = true;
        if (input2.year < input1.year) {
            console.log('y');
            check = false;
        }
        if ((input2.year === input1.year) && (input2.month < input1.month)) {
            console.log('m');
            check = false;
        }
        if ((input2.year === input1.year) && (input2.month === input1.month) && (input2.day < input1.day)) {
            check = false;
        } 
        return check;
        
    }

    function switchMonth(month) {
        let monthR;
        switch(month) {
            case 1:
                monthR = 'Jan';
                break;
            case 2:
                monthR = 'Feb';
                break;
            case 3:
                monthR = 'Mar';
                break;
            case 4:
                monthR = 'Apr';
                break;
            case 5:
                monthR = 'May';
                break;
            case 6:
                monthR = 'Jun';
                break;
            case 7:
                monthR = 'Jul';
                break;
            case 8:
                monthR = 'Aug';
                break;
            case 9:
                monthR = 'Sep';
                break;
            case 10:
                monthR = 'Oct';
                break;
            case 11:
                monthR = 'Nov';
                break;
            case 12:
                monthR = 'Dec';
                break;
        }
        return monthR
    }

});