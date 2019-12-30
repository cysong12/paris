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
    let input1, input2, input1Obj, input2Obj;

    let store = "store1";
    document.getElementById("storeName").innerHTML = document.getElementById(store).innerHTML;
    let del = document.getElementById("table");

    function delChildrenNodes(del) {
        while (del.hasChildNodes()) {
            del.removeChild(del.lastChild);
        }
    }

    $("#store1").click(function() {
        store = "store1";
        document.getElementById("storeName").innerHTML = document.getElementById("store1").innerHTML;
        delChildrenNodes(del);
        showDateData(input1Obj, input2Obj);
    });
    $("#store2").click(function() {
        store = "store2";
        document.getElementById("storeName").innerHTML = document.getElementById("store2").innerHTML;
        delChildrenNodes(del);
        showDateData(input1Obj, input2Obj);
    });
    $("#store3").click(function() {
        store = "store3";
        document.getElementById("storeName").innerHTML = document.getElementById("store3").innerHTML;
        delChildrenNodes(del);
        showDateData(input1Obj, input2Obj);
    });

    $("#viewButton").click(function() {
        delChildrenNodes(del);
        input1 = document.getElementById('datetimepicker1').value;
        input2 = document.getElementById('datetimepicker2').value;
        console.log(input1, input2);
        input1Obj = {
            year: Number(input1.substring(0, 4)),
            month: Number(input1.substring(5, 7)),
            monthName: switchMonth(Number(input1.substring(5, 7))),
            day: Number(input1.substring(8, 10)),
            dayName: input1.substring(11, 14)
        }
        input2Obj = {
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
    let div = document.getElementById("table");
    //let overviewTable = document.createElement("TABLE");
    function createTable(tableId) {
        let tableEl = document.createElement("TABLE");
        tableEl.setAttribute("id", tableId);
        let thead = document.createElement("THEAD");
        let tr = document.createElement("TR");
        let th1 = document.createElement("TH");
        let th2 = document.createElement("TH");
        let th3 = document.createElement("TH");
        let th4 = document.createElement("TH");
        let tbody = document.createElement("TBODY");
        tableEl.className = "table table-striped table-bordered";
        div.appendChild(tableEl);
        tableEl.appendChild(thead);
        thead.appendChild(tr);
        th1.innerHTML = "이름";
        th2.innerHTML = "시급 (기간 평균)";
        th3.innerHTML = "시간";
        th4.innerHTML = "급여";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tbody.setAttribute("ID", "tbody");
        tableEl.appendChild(tbody);
    }

    function showDateData(input1, input2) {
        let startDateRange = input1.dayName + input1.monthName + input1.day + input1.year;
        let endDateRange = input2.dayName + input2.monthName + input2.day + input2.year;
        let startDate = new Date(input1.year, input1.month - 1, input1.day);
        let endDate = new Date(input2.year, input2.month - 1, input2.day);
        let dates = getDates(startDate, endDate);   //array of dates (Date obj) between start and end
        let durationArr = [];
        let dayIncomeArr = [];

        createTable("overviewTable");
        let tbody = document.getElementById("tbody");

        //get each employee's work duration and dayIncomes of date range into arrays
        db.collection(store).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let tr = document.createElement("TR");
                tr.className = "employeeRow";
                let employeeDetailTr = document.createElement("TR");
                let temptd = document.createElement("TD");
                temptd.setAttribute("colspan", "4");
                let tempth = document.createElement("TH");
                tempth.setAttribute("colspan", "1");
                let tr1 = document.createElement("TR");
                let th1 = document.createElement("TH");
                let th2 = document.createElement("TH");
                let th3 = document.createElement("TH");
                let th4 = document.createElement("TH");
                let th5 = document.createElement("TH");
                let th6 = document.createElement("TH");
                th1.innerHTML = "날짜";
                th2.innerHTML = "시급";
                th3.innerHTML = "시작";
                th4.innerHTML = "끝";
                th5.innerHTML = "시간";
                th6.innerHTML = "일급";
                employeeDetailTr.appendChild(temptd);
                employeeDetailTr.className = "employeeOverviewDetail";
                let employeeDetailTable = document.createElement("TABLE"); // table goes in tr
                employeeDetailTable.style.tableLayout = "fixed";
                employeeDetailTable.style.width = "700px";
                temptd.appendChild(employeeDetailTable);
                employeeDetailTable.appendChild(tr1);
                th1.setAttribute("colspan", "3");
                th2.setAttribute("colspan", "3");
                th3.setAttribute("colspan", "3");
                th4.setAttribute("colspan", "3");
                th5.setAttribute("colspan", "3");
                th6.setAttribute("colspan", "3");
                tr1.appendChild(tempth);
                tr1.appendChild(th1);
                tr1.appendChild(th2);
                tr1.appendChild(th3);
                tr1.appendChild(th4);
                tr1.appendChild(th5);
                tr1.appendChild(th6);
                let tdname = document.createElement("TD");
                let tdduration = document.createElement("TD");
                tdduration.setAttribute("class", "tdduration");
                let tdwage = document.createElement("TD");
                let tddayincome= document.createElement("TD");
                let sumWage = 0;
                let days = 0;
                tddayincome.setAttribute("class", "tddayincome");
                tbody.appendChild(tr);
                tbody.appendChild(employeeDetailTr);
                tdname.innerHTML = doc.data().name;
                tr.appendChild(tdname);
                tr.appendChild(tdwage);
                tr.appendChild(tdduration);
                tr.appendChild(tddayincome);
                doc.ref.collection("timetable").where("dateCode", ">=", queryDateFormat(startDate))
                .where("dateCode", "<=", queryDateFormat(endDate)).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        sumWage += Number(doc.data().wage);
                        console.log(doc.data().wage, sumWage);
                        tdduration.innerHTML = Number(tdduration.innerHTML) + Number(doc.data().duration);
                        tddayincome.innerHTML = Number(tddayincome.innerHTML) + Number(doc.data().dayIncome);
                        days++;
                        let tdtempp = document.createElement("td");
                        tdtempp.setAttribute("colspan", "1");
                        let tr2 = document.createElement("TR");
                        employeeDetailTable.appendChild(tr2);
                        let tddaydate = document.createElement("td");
                        tddaydate.innerHTML = doc.data().dateCode.toString();
                        tddaydate.setAttribute("colspan", "3");
                        let tddayduration = document.createElement("td");
                        tddayduration.setAttribute("colspan", "3");
                        let tddaystarttime = document.createElement("td");
                        tddaystarttime.setAttribute("colspan", "3");
                        let tddayendtime = document.createElement("td");
                        tddayendtime.setAttribute("colspan", "3");
                        let tddaywage = document.createElement("td");
                        tddaywage.setAttribute("colspan", "3");
                        let tddayincome1 = document.createElement("td");
                        tddayincome1.setAttribute("colspan", "3");
                        tddayduration.innerHTML = Math.floor(tddayduration.innerHTML / 60).toString() + '시간 ' + (tddayduration.innerHTML % 60).toString() + '분';
                        tddaystarttime.innerHTML = doc.data().startTime;
                        tddayendtime.innerHTML = doc.data().endTime;
                        tddaywage.innerHTML = '₩' + doc.data().wage;
                        tddayincome1.innerHTML = '₩' + doc.data().dayIncome;
                        tr2.appendChild(tdtempp);
                        tr2.appendChild(tddaydate);
                        tr2.appendChild(tddaywage);
                        tr2.appendChild(tddaystarttime);
                        tr2.appendChild(tddayendtime);
                        tr2.appendChild(tddayduration);
                        tr2.appendChild(tddayincome1);
                    });
                    console.log(sumWage);
                    if (sumWage !== 0) {
                        tdwage.innerHTML = '₩' + Number(sumWage / days).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        console.log('yo');
                        tdwage.innerHTML = '₩' + Number(doc.data().wage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
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
            //employeeOverviewDetail
            //$("#overviewTable tr.employeeRow").addClass("odd");
            $("#overviewTable .employeeOverviewDetail").hide();
            //$("#overviewTable tr:first-child").show();
            
            $("#overviewTable .employeeRow").click(function(){
                $(this).next("tr").toggle();
                $(this).find(".arrow").toggleClass("up");
            });
            //$("#report").jExpand();
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