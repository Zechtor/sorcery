var React = require('react');
var Counter = require('./counter');
var DataTest = require('./dataTest');

var App = React.createClass({
    render : function() {
        return (
            <div>
                This is Sorcery.
                <Counter />
                <DataTest />
            </div>
        );
    }
});

module.exports = App;
