// UI libraries
var classNames = require("classnames");

// Date libary
var DateTools = {
    // converts date to format: Day Month Date (e.g. Tues Aug 5)
    // startTime is an epoch
    convertDate: function(startTime) {
        var d = new Date(startTime);

        // sets day of week
        var dayArray = new Array(7);
        dayArray[0]=  "Sun";
        dayArray[1] = "Mon";
        dayArray[2] = "Tues";
        dayArray[3] = "Wed";
        dayArray[4] = "Thurs";
        dayArray[5] = "Fri";
        dayArray[6] = "Sat";
        var day = dayArray[d.getDay()];  

        // sets month 
        var monthArray = new Array(12);
        monthArray[0]=  "Jan";
        monthArray[1] = "Feb";
        monthArray[2] = "March";
        monthArray[3] = "April";
        monthArray[4] = "May";
        monthArray[5] = "June";
        monthArray[6] = "July";
        monthArray[7] = "Aug";
        monthArray[8] = "Sept";
        monthArray[9] = "Oct";
        monthArray[10] = "Nov";
        monthArray[11] = "Dec";
        var month = monthArray[d.getMonth()];

        // sets date
        var date = d.getDate().toString();

        // sets time
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;

        // returns date string
        return day + ", " + month + " " + date + " - " + strTime;
    }
};

module.exports = {
    DateTools: DateTools,
    classNames: classNames
};
