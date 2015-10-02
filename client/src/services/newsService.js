var Request = require("./request");
var q = require("q");

var Service = {
    eof: false,
    page: 1,
    articles: [],

    get: function(page) {
        var deferred = q.defer();

        Request.get("/news?page=" + page, {}).then(function(data){
            // page doesn't update if the next page was empty 
            if (data.articles.length > 0) {
                Service.page = page;
                Service.eof = false;
            } else {
                Service.eof = true;
            }

            // service supports infinite scrolling
            if (page == 1) {
                Service.articles = data.articles;
            } else {
                Service.articles = Service.articles.concat(data.articles);
            }

            deferred.resolve();
        });

        return deferred.promise;
    }
};

module.exports = Service;