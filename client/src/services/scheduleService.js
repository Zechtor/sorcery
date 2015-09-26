var Request = require("./request");

var Service = {
    schedule: [],

    get: function(callback) {
        Request.get("/schedule", {}, function(data) {
            Service.schedule = data.schedule;
            callback();
        });
    },

    getShowcase: function() {
        var i;
        var currentEpoch = new Date() / 1000;
        var twoDaysEpoch = (2 * 24 * 60 * 60);
        var showcaseGame = Service.schedule[0];
        for (i = 0; i < Service.schedule.length; i++) {
            // Display upcoming game if start time takes place within 48 hours
            if (currentEpoch - Service.schedule[i].startTime < twoDaysEpoch) {
                if (Service.schedule[i].startTime < showcaseGame.startTime) {
                    showcaseGame = Service.schedule[i];
                    break;
                }
            } else {
                if (Service.schedule[i].startTime > showcaseGame.startTime && Service.schedule[i].startTime < currentEpoch) {
                    showcaseGame = Service.schedule[i];
                    break;
                }
            }
        }
        return showcaseGame;
    }
};

module.exports = Service;