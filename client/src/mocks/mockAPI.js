/* This is a simple mock api 
 * It houses example responses for all of the basic site operations
 * This is meant to be a tool for developing the client without any server support
 * Once the server exists, pieces of the mock API may need to be removed or refactored
 * Currently, the mock API only supports API happy paths
 */

var counterData = require('./data/counter');

module.exports = {
    getCounter: function() {
        return counterData;
    }
}