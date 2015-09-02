/* Request
 * Roughly based on the clutch python library: request
 */

var $ = require('jquery');

var Request = {
    baseUri = 'api.sorcery.com',
    
    get = function(path, params, callback) {
        $.get(baseUri + path, params, callback);
    },

    post = function(path, data, callback) {
        $.post(baseUri + path, data, callback);
    }
}

module.exports = Request;