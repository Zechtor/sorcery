var React = require('react');
var MockAPI = require('../mocks/mockAPI')

var DataTest = React.createClass({

    getInitialState: function() {
        return MockAPI.getTestData();
    },

    render: function() {
        return (
            <div>
                {this.state.message}
            </div>
        );
    }
});

module.exports = DataTest;