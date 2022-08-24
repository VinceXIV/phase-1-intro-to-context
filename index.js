// Your code here

function createEmployeeRecord(employeeDetails){
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(multipleEmployeesDetails){
    if(!multipleEmployeesDetails) return

    const employeeRecords = []
    for(const employee of multipleEmployeesDetails){
        employeeRecords.push(createEmployeeRecord(employee))   
    }

    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )

    return employeeRecord
}


function hoursWorkedOnDate(employeeRecord, date){
    const timeInDetails = employeeRecord.timeInEvents.find(timeInEvent =>{
        return timeInEvent.date == date.split(" ")[0]
    })

    const timeOutDetails = employeeRecord.timeOutEvents.find(timeOutEvent =>{
        return timeOutEvent.date == date.split(" ")[0]
    })

    return Math.abs(timeOutDetails.hour - timeInDetails.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return employeeRecord.payPerHour * hoursWorked
}

function allWagesFor(employeeRecord){

    if(!employeeRecord) return

    let totalWage = 0
    for(const timeInEvent of employeeRecord.timeInEvents){
        totalWage += wagesEarnedOnDate(employeeRecord, timeInEvent.date)
    }

    return totalWage
}

function calculatePayroll(multipleEmployeeRecords){

    if(!multipleEmployeeRecords) return

    let payroll = 0
    for(const employeeRecord of multipleEmployeeRecords){
        console.log(employeeRecord)
        payroll += allWagesFor(employeeRecord)
    }

    return payroll
}

let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
let newEvent = updatedBpRecord.timeInEvents[0]

console.log(updatedBpRecord)
console.log(newEvent)
