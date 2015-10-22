var Request = require("./request");
var TeamsService = require("./teamsService");
var q = require("q");

var self = {
    eof: false,
    page: 1,
    tweets: [],
    request: null,

    get: function(page) {
        // do not call another load if one is in flight
        if (self.request && self.request.promise.isPending()) {
            return self.request.promise;
        }

        self.request = q.defer();

        Request.get("/tweets?page=" + page + "&team=" + TeamsService.currentTeam.id, {}).then(function(data){
            // page doesn't update if the next page was empty 
            if (data.tweets.length > 0) {
                self.page = page;
                self.eof = false;
            } else {
                self.eof = true;
            }

            // service supports infinite scrolling
            if (page == 1) {
                self.tweets = data.tweets;
            } else {
                self.tweets = self.tweets.concat(data.tweets);
            }

            self.request.resolve();
        });

        return self.request.promise;
    }
};

module.exports = self;