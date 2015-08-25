var MockAPI = require('../mocks/mockAPI');

var CounterService = {
    count: 0,
    get: function() {
        // stubbed implementation uses mockAPI
        var data = MockAPI.getCounter();
        this.count = data.count;
    }
}

module.exports = CounterService;