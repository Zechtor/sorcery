var Request = require("./request");
var TeamsService = require("./teamsService");
var q = require("q");

var self = {
    eof: false,
    page: 1,
    articles: [],
    request: null,

    get: function(page) {
        // do not call another load if one is in flight
        if (self.request && self.request.promise.isPending()) {
            return self.request.promise;
        }

        self.request = q.defer();

        Request.get("/news?page=" + page + "&teamId=" + TeamsService.currentTeam.id, {}).then(function(data){
            // page doesn't update if the next page was empty 
            if (data.articles.length > 0) {
                self.page = page;
                self.eof = false;
            } else {
                self.eof = true;
            }

            // service supports infinite scrolling
            if (page == 1) {
                self.articles = data.articles;
            } else {
                self.articles = self.articles.concat(data.articles);
            }

            self.request.resolve();
        });

        return self.request.promise;
    }
};

module.exports = self;