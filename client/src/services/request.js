/* Request
 * Roughly based on the clutch python library: request
 */

var $ = require("jquery");
var q = require("q");
var config = require("config");

// to help us with testing
/* eslint no-console:0 */
var delay = 0;
$.fn.extend( {

    delayedDelete: function(path) {
        var deferred = q.defer();

        setTimeout (function() {
            $.ajax({
                url: path,
                type: "DELETE",
                success: function(data) {
                    deferred.resolve(data);
                }
            });
        }, delay);

        return deferred.promise;
    },

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

    delete: function(path) {
        var deferred = q.defer();

        $.fn.delayedDelete(config.serverUrl + path).then(function(data){
            console.log("DELETE " + path, data);
            deferred.resolve(data);
        });

        return deferred.promise;
    },
    
    get: function(path, params) {
        var deferred = q.defer();

        $.fn.delayedGet(config.serverUrl + path, params).then(function(data){
            console.log("GET " + path, data);
            deferred.resolve(data);
        });

        return deferred.promise;
    },

    post: function(path, data) {
        var deferred = q.defer();

        $.fn.delayedPost(config.serverUrl + path, data).then(function(data) {
            console.log("POST " + path, data);
            deferred.resolve(data);
        });

        return deferred.promise;
    }
};

module.exports = Request;