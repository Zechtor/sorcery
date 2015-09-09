var Request = require('./request');

var Service = {
    news: [],

    get: function(callback) {
        Request.get('/news', {}, function(data){
            Service.news = data.news;
            callback();
        });
    }
}

module.exports = Service;