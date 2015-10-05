var Request = require("./request");
var q = require("q");

var self = {
    schedule: [],
    request: null,

    get: function() {
        // do not call another load if one is in flight
        if (self.request && self.request.promise.isPending()) {
            return self.request.promise;
        }

        self.request = q.defer();

        Request.get("/schedule", {}).then(function(data) {
            self.schedule = data.games;
            self.request.resolve();
        });

        return self.request.promise;
    },

    getShowcase: function() {
        var i;
        var currentDate = new Date();
        var showcaseGame = self.schedule[0];
        for (i = 0; i < self.schedule.length; i++) {
            var scheduleDate = new Date(self.schedule[i].startTime);
            var showcaseDate = new Date(showcaseGame.startTime);
            if (Math.abs(currentDate - scheduleDate) < Math.abs(currentDate - showcaseDate)) {
                showcaseGame = self.schedule[i];
            }
        }
        return showcaseGame;
    }
};

module.exports = self;