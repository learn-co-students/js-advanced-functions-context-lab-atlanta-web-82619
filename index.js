/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 let createEmployeeRecord = function(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: []
    }
 }

 let createEmployeeRecords = function(input) {
    return input.map(employee => createEmployeeRecord(employee))
 }

 let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
 }

 let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return this
 }

 let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return this
 }

 let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(event => event.date === date)
    let outEvent = this.timeOutEvents.find(event => event.date === date)
    return (outEvent.hour - inEvent.hour)/100
 }

 let wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hours
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

let calculatePayroll = function(employees) {
    return employees.reduce((sum, wages) => sum + allWagesFor.call(wages), 0)
}
