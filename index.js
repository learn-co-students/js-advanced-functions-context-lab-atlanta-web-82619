/* Your Code Here */
function createEmployeeRecord(arr) {
    let employee = {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return employee;
  }
  
  function createEmployeeRecords(employees) {
    let employee_objects = employees.map(employee => createEmployeeRecord(employee));
    return employee_objects;
  }
  
  function createTimeInEvent( date_stamp) {
    let [date, hour] = date_stamp.split(" ");
  
    let timeIn = {
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    }
  
    this.timeInEvents.push(timeIn);
    return this;
  }
  
  function createTimeOutEvent( date_stamp) {
    let [date, hour] = date_stamp.split(" ");
  
    let timeOut = {
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date
    }
  
    this.timeOutEvents.push(timeOut);
    return this;
  }
  
  function hoursWorkedOnDate( date) {
    let timeOut = this.timeOutEvents.find(event => event.date === date);
    let timeOutHour = timeOut.hour;
  
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeInHour = timeIn.hour;
  
    return (timeOutHour - timeInHour)/100;
  }
  
  function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return this.payPerHour * hours;
  }
  
  function calculatePayroll(employee_array) {
    let employeeWages = employee_array.reduce((memo, emp) => memo + allWagesFor.call(emp), 0);
    return employeeWages;
  }
  
  function findEmployeeByFirstName(employees, name) {
    return employees.find(emp => emp.firstName === name)
  }

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