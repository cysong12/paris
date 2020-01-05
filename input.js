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

    let name, label, wage;
    let dayName, month, day, year;
    let dayNameKR, monthKR, dayKR, yearKR;

    let queryStringURL = decodeURIComponent(window.location.search);
    let tempVar = queryStringURL.split('?');
    let date = tempVar[1];
    if (tempVar[2] === undefined) {
        store = "store1";
    } else {
        store = tempVar[2];
    }

    document.getElementById("storeName").innerHTML = document.getElementById(store).innerHTML;

    $("#store1").click(function() {
        store = "store1";
        document.getElementById("storeName").innerHTML = document.getElementById("store1").innerHTML;
        window.location.href = "input.html?" + date + '?' + store;
    });
    $("#store2").click(function() {
        store = "store2";
        document.getElementById("storeName").innerHTML = document.getElementById("store2").innerHTML;
        window.location.href = "input.html?" + date + '?' + store;
    });
    $("#store3").click(function() {
        store = "store3";
        document.getElementById("storeName").innerHTML = document.getElementById("store3").innerHTML;
        window.location.href = "input.html?" + date + '?' + store;
    });

    let datedb, monthdb;

    dayName = date.substring(0, 3);
    month = date.substring(3, 6);
    day = date.substring(6, 8);
    year = date.substring(8, 12);

    dayKR = day + '일';
    yearKR = year + '년';
    switch(month) {
        case "Jan":
            monthdb = '01';
            break;
        case "Feb":
            monthdb = '02';
            break;
        case "Mar":
            monthdb = '03';
            break;
        case "Apr":
            monthdb = '04';
            break;
        case "May":
            monthdb = '05';
            break;
        case "Jun":
            monthdb = '06';
            break;
        case "Jul":
            monthdb = '07';
            break;
        case "Aug":
            monthdb = '08';
            break;
        case "Sep":
            monthdb = '09';
            break;
        case "Oct":
            monthdb = '10';
            break;
        case "Nov":
            monthdb = '11';
            break;
        case "Dec":
            monthdb = '12';
            break;
    }
    datedb = year + monthdb + day;

    switch(dayName) {
        case "Mon":
            dayNameKR = '(월)';
            break;
        case "Tue":
            dayNameKR = '(화)';
            break;
        case "Wed":
            dayNameKR = '(수)';
            break;
        case "Thu":
            dayNameKR = '(목)';
            break;
        case "Fri":
            dayNameKR = '(금)';
            break;
        case "Sat":
            dayNameKR = '(토)';
            break;
        case "Sun":
            dayNameKR = '(일)';
            break;
    }

    switch(month) {
        case "Jan":
            monthKR = '1월';
            break;
        case "Feb":
            monthKR = '2월';
            break;
        case "Mar":
            monthKR = '3월';
            break;
        case "Apr":
            monthKR = '4월';
            break;
        case "May":
            monthKR = '5월';
            break;
        case "Jun":
            monthKR = '6월';
            break;
        case "Jul":
            monthKR = '7월';
            break;
        case "Aug":
            monthKR = '8월';
            break;
        case "Sep":
            monthKR = '9월';
            break;
        case "Oct":
            monthKR = '10월';
            break;
        case "Nov":
            monthKR = '11월';
            break;
        case "Dec":
            monthKR = '12월';
            break;
    }

    console.log(dayName, month, day, year);
    document.getElementById("dateP").innerHTML = yearKR + ' ' + monthKR + ' ' + dayKR + ' ' + dayNameKR;

    let employee_count = 0;

    readEmployeeDb();

    let names = document.getElementsByClassName("user");
    let wageArr = [];

    let startTimes = document.getElementsByClassName("startTime");
    let endTimes = document.getElementsByClassName("endTime");
    let dayIncomeLabel = document.getElementsByClassName("dayIncome");
    let nextDayAlert = document.getElementsByClassName("nextDayAlert");

    function readEmployeeDb() {
        let i = 0;
        
        db.collection(store).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().name !== '') {
                    names[i].innerHTML = doc.data().name + ' (시급: ₩' + doc.data().wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ')';
                    wageArr.push(doc.data().wage);
                    employee_count++;
                }
                i++;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        for (let j=0; j < 18; j++) {
            console.log('hmm');
            db.collection(store).doc(String.fromCharCode(j+65)).collection("timetable").doc(date).get().then(function(doc) {
                if (doc.exists) {
                    if (doc.data().startTime !== "00:00:00" && doc.data().endTime !== "00:00:00") {
                        console.log('yo');
                        startTimes[j].value = doc.data().startTime;
                        endTimes[j].value = doc.data().endTime;
                        dayIncomeLabel[j].innerHTML = "일급: ₩" + doc.data().dayIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    } else {
                        startTimes[j].value = "00:00:00";
                        endTimes[j].value = "00:00:00";
                        dayIncomeLabel[j].innerHTML = "일급: ₩0";
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
    }

    let duration, startM, startH, endM, endH;
    let startTemp, endTemp, dayIncome;
    let dayIncomeArr = [];
    console.log(startTimes[0].value);

    $("#saveButton").click(function() {
        if (valid12 === false) {
            let clicked = confirm("직원중 한명이 12시간이 넘습니다. 그래도 저장하시겠습니까?");
            if (clicked == true) { //00:00:00
                for (i = 0; i < employee_count; i++) {
                    startTemp = startTimes[i].value;
                    endTemp = endTimes[i].value;
                    if (Number((startTemp.substring(0, 2)) > Number(endTemp.substring(0, 2))) && Number(endTemp.substring(0, 2)) < 6) {
                        endTemp = (Number(endTemp.substring(0, 2)) + 24).toString() + endTemp.substring(2, 5);
                        nextDayAlert[i].innerHTML = "다음날";
                        nextDayAlert[i].style.color = "red";
                    }
                    differenceArr = differenceCalculate(startTemp, endTemp);
                    difference = differenceArr[0];
                    differencePrint = differenceArr[1];
                    dayIncome = difference / 60 * wageArr[i];
                    dayIncomeArr.push(dayIncome);
                    console.log((difference / 60 * wageArr[i]).toFixed(2));
                    db.collection(store).doc(String.fromCharCode(i+65)).collection("timetable").doc(date).set({
                        startTime: startTemp.substring(0,5),
                        endTime: endTemp.substring(0,5),
                        wage: wageArr[i],
                        duration: difference,
                        dateCode: Number(datedb),
                        dayIncome: Number((difference / 60 * wageArr[i]).toFixed(2))
                    });
                }
            }
        } else {
            for (i = 0; i < employee_count; i++) {
                startTemp = startTimes[i].value;
                endTemp = endTimes[i].value;
                if (Number((startTemp.substring(0, 2)) > Number(endTemp.substring(0, 2))) && Number(endTemp.substring(0, 2)) < 6) {
                    endTemp = (Number(endTemp.substring(0, 2)) + 24).toString() + endTemp.substring(2, 5);
                    nextDayAlert[i].innerHTML = "다음날";
                    nextDayAlert[i].style.color = "red";
                }
                differenceArr = differenceCalculate(startTemp, endTemp);
                difference = differenceArr[0];
                differencePrint = differenceArr[1];
                dayIncome = difference / 60 * wageArr[i];
                dayIncomeArr.push(dayIncome);
                console.log((difference / 60 * wageArr[i]).toFixed(2));
                db.collection(store).doc(String.fromCharCode(i+65)).collection("timetable").doc(date).set({
                    startTime: startTemp.substring(0,5),
                    endTime: endTemp.substring(0,5),
                    wage: wageArr[i],
                    duration: difference,
                    dateCode: Number(datedb),
                    dayIncome: Number((difference / 60 * wageArr[i]).toFixed(2))
                });
            }
        }
        tempAlert();
        setTimeout(function() {
            window.alert("저장이 완료되었습니다");
        }, 1500);
    });

    function tempAlert(){
        let el = document.createElement("div");
        el.setAttribute("style","position:fixed;bottom:300px;right:50px;background-color:lightgrey;");
        el.innerHTML = "저장중...";
        setTimeout(function(){
            el.parentNode.removeChild(el);
        }, 1000);
        document.body.appendChild(el);
    }

    let endTotalMinutes, startTotalMinutes, durationMinute, durationHour;

    function differenceCalculate(start, end) {
        startH = Number(start.substring(0,2));
        startM = Number(start.substring(3, 5));
        endH = Number(end.substring(0,2));
        endM = Number(end.substring(3, 5));
        console.log(startH, startM, endH, endM);
        endTotalMinutes = endH * 60 + endM;
        startTotalMinutes = startH * 60 + startM;
        durationInMinutes = endTotalMinutes - startTotalMinutes;
        durationMinute = Math.floor((endTotalMinutes - startTotalMinutes) % 60);
        durationHour = parseInt((endTotalMinutes - startTotalMinutes - durationMinute) / 60);
        return [durationInMinutes, durationHour.toString() + ':', durationMinute.toString()];
    }
    let valid12;
    document.getElementById("saveButton").disabled = true;
    $("#checkButton").click(function() {
        let valid = true;
        valid12 = true;
        for (let i = 0; i < employee_count; i++) {
            startTemp = startTimes[i].value;
            endTemp = endTimes[i].value;
            if (Number((startTemp.substring(0, 2)) > Number(endTemp.substring(0, 2))) && Number(endTemp.substring(0, 2)) < 6) {
                endTemp = (Number(endTemp.substring(0, 2)) + 24).toString() + endTemp.substring(2, 5);
                nextDayAlert[i].innerHTML = "다음날";
                nextDayAlert[i].style.color = "red";
            }
            console.log(endTemp, typeof(endTemp));
            differenceArr = differenceCalculate(startTemp, endTemp);
            difference = differenceArr[0];
            if (difference < 0) {
                dayIncomeLabel[i].innerHTML = '시간이 옳은지 다시 확인해주세요';
                dayIncomeLabel[i].style.color = "red";
                document.getElementById("saveButton").disabled = true;
                valid = false;
            } else if (difference >= 720) {
                dayIncomeLabel[i].innerHTML = '12시간이 넘습니다!';
                dayIncomeLabel[i].style.color = "red";
                valid12 = false;
            } else {
                differencePrint = differenceArr[1];
                dayIncome = difference / 60 * wageArr[i];
                console.log('hi');
                dayIncomeLabel[i].innerHTML = '일급: W' + dayIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                dayIncomeLabel[i].style.color = "green";
            }
        }
        if (valid) {
            document.getElementById("saveButton").disabled = false;
        }
    });

    
});
