var Request = require("./request");

var Service = {
    schedule: [],

    get: function(callback) {
        Request.get("/schedule", {}, function(data){
            Service.schedule = data.schedule;
            callback();
        });
    }
};

module.exports = Service;