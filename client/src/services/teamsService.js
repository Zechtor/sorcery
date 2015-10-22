// this service manages the teams and keeps track of the currently selected team

var Request = require("./request");
var q = require("q");

var self = {
    currentTeam: null,
    teams: [],
    request: null,

    get: function(teamName) {
        if (self.request && self.request.promise.isPending()) {
            return self.request.promise;
        }

        self.request = q.defer();
        // match team name
        if (self.teams.length > 0) {
            self.currentTeam = findTeam(teamName, self.teams);
            self.request.resolve();
            return self.request.promise;
        }

        Request.get("/teams").then(function(data) {
            self.teams = data.teams;
            self.currentTeam = findTeam(teamName, self.teams);
            self.request.resolve();
        });

        return self.request.promise;
    }
};

function findTeam(teamName, teams) {
    for (var i = 0; i < teams.length; i++) {
        if (teamName.toLowerCase() === teams[i].name.toLowerCase()) {
            return teams[i];
        } 
    }
    return teams[1];
}

module.exports = self;