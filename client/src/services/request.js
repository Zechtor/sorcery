/* Request
 * Roughly based on the clutch python library: request
 */

var $ = require("jquery");
var q = require("q");

// to help us with testing
/* eslint no-console:0 */
var delay = 1000;
$.fn.extend( {

    delayedGet: function(path, params) {
        var deferred = q.defer();

        setTimeout (function() {
            $.get(path, params, function(data) {
                deferred.resolve(data);
            });
        }, delay);

        return deferred.promise;
    },

    delayedPost: function(path, params) {
        var deferred = q.defer();

        setTimeout (function() {
            $.post(path, params, function(data) {
                deferred.resolve(data);
            });
        }, delay);

        return deferred.promise;
    }
});

var Request = {
    baseUri: "http://localhost:5000",
    
    get: function(path, params) {
        var deferred = q.defer();

        $.fn.delayedGet(this.baseUri + path, params).then(function(data){
            console.log("GET " + path, data);
            deferred.resolve(data);
        });

        return deferred.promise;
    },

    post: function(path, data) {
        var deferred = q.defer();

        $.fn.delayedPost(this.baseUri + path, data).then(function(data) {
            console.log("POST" + path, data);
            deferred.resolve(data);
        });

        return deferred.promise;
    }
};

module.exports = Request;