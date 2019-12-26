$(document).ready(function(){

    let db = firebase.firestore();

    let name, label, wage;
    let dayName, month, day, year;
    let dayNameKR, monthKR, dayKR, yearKR;
    let employee_count;

    let queryStringURL = decodeURIComponent(window.location.search);
    let tempVar = queryStringURL.split('?');
    let date = tempVar[1];
    console.log(date);

    dayName = date.substring(0, 3);
    month = date.substring(3, 6);
    day = date.substring(6, 8);
    year = date.substring(8, 12);

    dayKR = day + '일';
    yearKR = year + '년';

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

    readEmployeeDb();

    let names = document.getElementsByClassName("user");
    let wageArr = [];

    function readEmployeeDb() {
        let i = 0;
        employee_count = 0; 
        db.collection("employees").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().name !== '') {
                    names[i].innerHTML = doc.data().name + ' (₩' + doc.data().wage + ')';
                    wageArr.push(doc.data().wage);
                    employee_count++;
                }
                i++;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    let startTimes = document.getElementsByClassName("startTime");
    let endTimes = document.getElementsByClassName("endTime");
    let duration, startM, startH, endM, endH;
    let startTemp, endTemp;
    console.log(startTimes[0].value);

    $("#saveButton").click(function() {
        console.log(employee_count);
        for (i = 0; i < employee_count; i++) {
            startTemp = startTimes[i].value;
            endTemp = endTimes[i].value;
            differenceArr = differenceCalculate(startTemp, endTemp);
            difference = differenceArr[0];
            differencePrint = differenceArr[1];
            console.log(startTemp, endTemp);
            console.log(difference);
            console.log(wageArr[i]);
            db.collection("employees").doc(i.toString()).collection("timetable").doc(date).set({
                startTime: startTemp,
                endTime: endTemp,
                duration: differencePrint,
                dayIncome: difference / 60 * wageArr[i]
            });
        }
    });

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

    function checkValid() {
        for (let i = 0; i < employee_count; i++) {
            
        }
    }

    
});
