var CounterService = require('../services/counterService');

// component class
var Counter = React.createClass({
    
    // setting the state of a component
    getInitialState: function() {
        CounterService.get();
        return CounterService;
    },

    // setting methods of a component
    incrementCount: function() {
        this.setState({
            count: this.state.count + 1
        });
    },

    // render what the component looks like
    render : function() {
        return (
            <div>
                <div>
                    Count: {this.state.count}
                </div>
                <button type="button" onClick={this.incrementCount}>
                    Increment
                </button>
            </div>
        );
    }
});

// returns the component so other components can use it via require()
module.exports = Counter;
