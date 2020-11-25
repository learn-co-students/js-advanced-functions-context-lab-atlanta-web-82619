/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
const createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(records) {
    return records.map(record => createEmployeeRecord(record))
}

const createTimeInEvent = function(timeIn) {
    let [date, time] = timeIn.split(" ")
    let event = {type: "TimeIn", date: date, hour: parseInt(time)}
    this.timeInEvents.push(event)
    return this
}

const createTimeOutEvent = function(timeOut) {
    let [date, time] = timeOut.split(" ")
    let event = {type: "TimeOut", date: date, hour: parseInt(time)}
    this.timeOutEvents.push(event)
    return this
}

const hoursWorkedOnDate = function(date) {
    let inDay = this.timeInEvents.find(event => event.date === date)
    let outDay = this.timeOutEvents.find(event => event.date === date)
    return (outDay.hour - inDay.hour)/100
}

const wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours * this.payPerHour
}

const allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}

let calculatePayroll = function(records){
    return records.reduce((memo, rec) => memo + allWagesFor.call(rec), 0)
}

const findEmployeeByFirstName = function(eeRecords, name) {
    return eeRecords.find(ee => ee.firstName === name)
}