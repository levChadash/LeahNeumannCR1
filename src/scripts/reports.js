class Report {
    constructor(startDate, endDate, city, location) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.location = location;
    }
}
class Patient {
    reportsList = [];
    constructor(id, reportsList) {
        this.id = id;
        this.reportsList = reportsList;
    }
}
let patientList = [];
function load(){
document.getElementById('idInput').addEventListener('change',()=>getReportsList())
if (!getFromStorage()) {
    setInStorage(patientList);
}
}
function getReportsList() {
    patientList = getFromStorage();
    cleanReportsTemp();
    const id = document.getElementById('idInput').value;
    debugger;
    if (isValidIsraeliID(id)) {
        const ind = findPatientReports(id);
        if (patientList.length > 0) {
            const reports = patientList[ind]['reportsList'];
            const reportTemp = document.getElementById("temp-row");
            reports.forEach(reportObj => {
                drawReport(reportObj, reportTemp);
            })
        }
    }
    else
    alert('id isnt valid')
}

function findPatientReports(id) {
    document.getElementById("reportsDiv").hidden = false;
    if (patientList === null)
        return -1;
    return patientList.findIndex(patient => patient.id == id);

}

function drawReport(reportObj, reportTemp) {
    let clonReport = reportTemp.content.cloneNode(true);
    clonReport.querySelector('.startDate').innerHTML = new Date(reportObj.startDate).toLocaleString('en-US');
    clonReport.querySelector('.endDate').innerHTML = new Date(reportObj.endDate).toLocaleString('en-US');
    clonReport.querySelector('.city').innerHTML = reportObj.city;
    clonReport.querySelector('.location').innerHTML = reportObj.location;
    clonReport.getElementById("deleteReport").addEventListener('click', () => deleteItem(reportObj))
    document.getElementById("reports").appendChild(clonReport);
}

function deleteItem(reportObj) {
    const id = document.getElementById('idInput').value;
    const reportsInd = findPatientReports(id);
    let reports = patientList[reportsInd]['reportsList'];
    const ind = reports.findIndex(repo => checkEqualReport(repo, reportObj));
    reports.splice(ind, 1);
    patientList[reportsInd]['reportsList'] = reports
    setInStorage(patientList);
    getReportsList();
}


function checkEqualReport(report, reportObj) {
    if (
        report.startDate === reportObj.startDate
        && report.endDate === reportObj.endDate
        && report.city === reportObj.city
        && report.location === reportObj.location
    )
        return true;
    return false;

}

function cleanReportsTemp() {
    document.getElementById("reportsDiv").hidden = true;
    document.getElementById("reports").innerHTML = " ";
}

document.getElementById('addButton').addEventListener('click', () => getReportInput());
function getReportInput() {
    const startDate = new Date(document.getElementById('startDateInput').value);
    const endDate = new Date(document.getElementById('endDateInput').value);
    const city = document.getElementById('cityInput').value;
    const location = document.getElementById('locationInput').value;
    const report = new Report(startDate, endDate, city, location);
    addReport(report);
}

function addReport(report) {
    const id = document.getElementById('idInput').value;
    const ind = findPatientReports(id);
    if (ind === -1) {
        const patient = new Patient(id, [report]);
        patientList.push(patient);
    }
    else
        patientList[ind]['reportsList'].push(report);
    setInStorage(patientList);
    getReportsList();
}
function getFromStorage() {
    let pl = window.localStorage.getItem('patientList');
    return JSON.parse(pl);

}
function setInStorage(pl) {
    window.localStorage.setItem('patientList', JSON.stringify(pl));

}

function isValidIsraeliID(id) {
	var id = String(id).trim();
	if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

	// Pad string with zeros up to 9 digits
  	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  	return Array
            .from(id, Number)
  		    .reduce((counter, digit, i) => {
		        const step = digit * ((i % 2) + 1);
                        return counter + (step > 9 ? step - 9 : step);
    	            }) % 10 === 0;
}
