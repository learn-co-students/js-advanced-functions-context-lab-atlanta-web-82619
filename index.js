/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(record => {
        return createEmployeeRecord(record);
    })
}

function createTimeInEvent(datestamp) {
    const split = datestamp.split(' ');
    const date = split[0];
    const hour = parseInt(split[1], 10);
    this.timeInEvents.push({
        type: 'TimeIn',
        hour,
        date
    })

    return this;
}

function createTimeOutEvent(datestamp) {
    const split = datestamp.split(' ');
    const date = split[0];
    const hour = parseInt(split[1], 10);
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour,
        date
    })

    return this;
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => {
        return event.date === date;
    })

    const timeOutEvent = this.timeOutEvents.find(event => {
        return event.date === date;
    })

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return (hoursWorkedOnDate.call(this, date) * this.payPerHour);
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(arr, firstName) {
    return arr.find(employee => {
        return employee.firstName === firstName;
    })
}

function calculatePayroll(arr) {
    return arr.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0)
}