var Request = require("./request");

var Service = {
    page: 1,
    tweets: [],

    get: function(page, callback) {
        Request.get("/tweets?page=" + page, {}, function(data){
            // page doesn't update if the next page was empty 
            if (data.tweets.length > 0) {
                Service.page = page;
            }

            // service supports infinite scrolling
            if (page == 1) {
                Service.tweets = data.tweets;
            } else {
                Service.tweets = Service.tweets.concat(data.tweets);
            }

            callback();
        });
    }
};

module.exports = Service;