var React = require('react');
var Counter = require('./counter.js');

var App = React.createClass({
    render : function() {
        return (
            <div>
                This is Sorcery.
                <Counter />
            </div>
        );
    }
});

module.exports = App;
