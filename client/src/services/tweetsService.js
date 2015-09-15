var Request = require("./request");

var Service = {
    tweets: [],

    get: function(callback) {
        Request.get("/tweets", {}, function(data){
            Service.tweets = data.tweets;
            callback();
        });
    }
};

module.exports = Service;