/* Request
 * Roughly based on the clutch python library: request
 */

// TODO: investigate using a promise model instead of a callback model

var $ = require("jquery");

// to help us with testing
/* eslint no-console:0 */
var delay = 2000;
$.fn.extend( {

    delayedGet: function(path, params, callback) {
        setTimeout (function() {
            $.get(path, params, callback);
        }, delay);
    },

    delayedPost: function(path, params, callback) {
        setTimeout (function() {
            $.post(path, params, callback);
        }, delay);
    }
});

var Request = {
    baseUri: "http://localhost:5000",
    
    get: function(path, params, callback) {
        $.fn.delayedGet(this.baseUri + path, params, function(data){
            console.log("GET " + path, data);
            callback(data);
        });
    },

    post: function(path, data, callback) {
        $.fn.delayedPost(this.baseUri + path, data, function(data) {
            console.log("POST" + path, data);
            callback(data);
        });
    }
};

module.exports = Request;