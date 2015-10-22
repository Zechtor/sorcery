var Request = require("./request");
var q = require("q");

var self = {
    request: null,
    teamId: 1,

    get: function() {
        // do not call another load if one is in flight
        if (self.request && self.request.promise.isPending()) {
            return self.request.promise;
        }

        self.request = q.defer();

        Request.get("/live?team=" + teamId, {}).then(function(data) {
            self.request.resolve(data.game);
        });

        return self.request.promise;
    }
};

module.exports = self;