var MockAPI = require('../mocks/mockAPI');

var ScheduleService = {
	games: [],
    get: function() {
        // stubbed implementation uses mockAPI
        var data = MockAPI.getSchedule();
        this.games = data.games;
        console.log("This is my data", data);
    }
}

module.exports = ScheduleService;
