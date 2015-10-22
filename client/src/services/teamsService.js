// this service manages the teams and keeps track of the currently selected team

var Request = require("./request");

var self = {
    currentTeam: null,
    teams: [],

    get: function(teamName) {
        if (teams.length > 0) {
        // match teamname
            for (i = 0; teams[i]; i++)
            {
                if (teamName == team[i])
                {
                    self.currentTeam = team[i];
                    return self.request.promise;
                }
            }
        }

        Request.get("/teams").then(function(data) {
            self.teams = data.teams;
            for (i = 0; teams[i]; i++)
            {
                if (teamName == team[i])
                {
                    self.currentTeam = team[i];
                    return self.request.promise;
                }
            }
        });
    }
};

module.exports = self;