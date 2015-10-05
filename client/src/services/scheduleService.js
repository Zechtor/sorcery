var Request = require("./request");
var q = require("q");

var Service = {
    schedule: [],

    get: function() {
        var deferred = q.defer();

        Request.get("/schedule", {}).then(function(data) {
            Service.schedule = data.games;
            deferred.resolve();
        });

        return deferred.promise;
    },

    getShowcase: function() {
        var i;
        var currentDate = new Date();
        var showcaseGame = Service.schedule[0];
        for (i = 0; i < Service.schedule.length; i++) {
            var scheduleDate = new Date(Service.schedule[i].startTime);
            var showcaseDate = new Date(showcaseGame.startTime);
            if (Math.abs(currentDate - scheduleDate) < Math.abs(currentDate - showcaseDate)) {
                showcaseGame = Service.schedule[i];
            }
        }
        return showcaseGame;
    }
};

module.exports = Service;