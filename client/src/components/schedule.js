var ScheduleService = require('../services/scheduleService');

var Schedule = React.createClass({

	// setting the state of a component
    getInitialState: function() {
        ScheduleService.get();
        return ScheduleService;
    },

     
    render : function() {
        return (
            <section className="schedule">
                {this.state.games}
            </section>
        );
    }
});

module.exports = Schedule;
