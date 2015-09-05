/* Request
 * Roughly based on the clutch python library: request
 */

 // TODO: investigate using a promise model instead of a callback model

var $ = require('jquery');

var Request = {
    baseUri: 'http://localhost:5000',
    
    get: function(path, params, callback) {
        $.get(this.baseUri + path, params, function(data){
            console.log(data);
            callback(data);
        });
    },

    post: function(path, data, callback) {
        $.post(this.baseUri + path, data, function(data) {
            console.log(data);
            callback(data);
        });
    }
}

module.exports = Request;