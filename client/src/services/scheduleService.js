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
        var currentEpoch = new Date() / 1000;
        var twoDaysEpoch = (2 * 24 * 60 * 60);
        var showcaseGame = self.schedule[0];
        for (i = 0; i < self.schedule.length; i++) {
            // Display upcoming game if start time takes place within 48 hours
            if (currentEpoch - self.schedule[i].startTime < twoDaysEpoch) {
                if (self.schedule[i].startTime < showcaseGame.startTime) {
                    showcaseGame = self.schedule[i];
                    break;
                }
            } else {
                if (self.schedule[i].startTime > showcaseGame.startTime && self.schedule[i].startTime < currentEpoch) {
                    showcaseGame = self.schedule[i];
                    break;
                }
            }
        }
        return showcaseGame;
    }
};

module.exports = self;