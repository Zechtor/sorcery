var Request = require("./request");
var q = require("q");

var Service = {
    eof: false,
    page: 1,
    tweets: [],

    get: function(page) {
        var deferred = q.defer();

        Request.get("/tweets?page=" + page, {}).then(function(data){
            // page doesn't update if the next page was empty 
            if (data.tweets.length > 0) {
                Service.page = page;
                Service.eof = false;
            } else {
                Service.eof = true;
            }

            // service supports infinite scrolling
            if (page == 1) {
                Service.tweets = data.tweets;
            } else {
                Service.tweets = Service.tweets.concat(data.tweets);
            }

            deferred.resolve();
        });

        return deferred.promise;
    }
};

module.exports = Service;