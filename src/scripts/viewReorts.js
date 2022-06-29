let patientList = [];
let reportList=[];
function load(){
document.getElementById('citySearch').addEventListener('input',()=>cityFilter());
if(!getFromStorage())
setInStorage(patientList);
sortByDate();
getReportsList();
}
function getReportsList(){
    patientList=getFromStorage();
    const reportTemp = document.getElementById("temp-item");
    reportList.forEach(reportObj=>{
             drawReport(reportTemp,reportObj);
    })
}

function drawReport(reportTemp,reportObj){
    let clonReport = reportTemp.content.cloneNode(true);
    clonReport.querySelector('.reportsList').innerHTML = 
    new Date(reportObj.startDate).toLocaleString('en-US')
    + ' - '
    + new Date(reportObj.endDate).toLocaleString('en-US')
    +' | '
    +reportObj.location;
    document.getElementById("reportsListUl").appendChild(clonReport);
}

function getFromStorage(){
    let pl= window.localStorage.getItem('patientList');
    return JSON.parse(pl);
 }

 function setInStorage(pl){
     window.localStorage.setItem('patientList', JSON.stringify(pl));
 
 }

 function sortByDate(){
        patientList=getFromStorage();
        generateReportsList();
        reportList.sort(function(a,b){
        var c = new Date(a.startDate);
        var d = new Date(b.startDate);
        return d-c;
        });
 }

 function generateReportsList(){
    patientList.forEach(patient=>{
        patient.reportsList.forEach(report=>{
            reportList.push(report);
        })
    })
}

function cityFilter(){
   cleanReportsTemp();
   const city= document.getElementById('citySearch').value;
   const reportTemp = document.getElementById("temp-item");
   reportList.forEach(report=>{
      if(report.city.toLowerCase().includes(city.toLowerCase())) 
      drawReport(reportTemp,report);
   })
}
function cleanReportsTemp() {
    document.getElementById("reportsListUl").innerHTML = " ";
}