var Request = require("./request");
var TeamsService = require("./teamService");
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

        Request.get("/schedule?team=" + TeamsService.currentTeam.id, {}).then(function(data) {
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
    },

    isLive: function() {
        var isLive = false;
        var game = self.getShowcase();
        var startTime = new Date(game.startTime);
        var now = new Date();

        if (startTime <= now && game.status != "Final") {
            isLive = true;
        }

        return isLive;
    },

    timeUntilNextGame: function() {
        var now = new Date();
        var startTime = new Date();

        // starting from the top, the first game with a positive time differential is the next
        for (var i = 0; i < self.schedule.length; i++) {
            var scheduleDate = new Date(self.schedule[i].startTime);
            if (scheduleDate - now >= 0) {
                startTime = scheduleDate;
                break;
            }
        }

        return startTime - now;
    }
};

module.exports = self;