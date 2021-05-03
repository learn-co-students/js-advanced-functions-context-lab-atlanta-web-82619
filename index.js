/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(employeeInfo){
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesInfo){
    return employeesInfo.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(timeStamp){
    let dateTime = timeStamp.split(' ');
    let hour = parseInt(dateTime[1]);
    let date = dateTime[0];
    let event = {type: 'TimeIn', hour: hour, date: date};
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(timeStamp){
    let dateTime = timeStamp.split(' ');
    let hour = parseInt(dateTime[1]);
    let date = dateTime[0];
    let event = {type: 'TimeOut', hour: hour, date: date};
    this.timeOutEvents.push(event);
    return this;
}

function hoursWorkedOnDate(date){
    let timeIn = this.timeInEvents.find(event => event.date === date).hour;
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function findEmployeeByFirstName(employees, name){
    return employees.find(employee => employee.firstName === name);
}

function calculatePayroll(employees){
    return employees.reduce((memo, record) => memo + allWagesFor.apply(record), 0);
}