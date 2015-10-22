// this service manages the teams and keeps track of the currently selected team

var Request = require("./request");

var self = {
    currentTeam: null,
    teams: [],

    get: function(teamName) {
        // match team name
        if (teams.length > 0) 
            findTeam(teamName);        

        Request.get("/teams").then(function(data) {
            self.teams = data.teams;
            findTeam(teamName);
        });
    }
};

function findTeam(teamName) {
    for (i = 0; teams[i]; i++)
        {
        if (teamName === team[i].name)
        {
            self.currentTeam = team[i];
        }
    }
}

module.exports = self;