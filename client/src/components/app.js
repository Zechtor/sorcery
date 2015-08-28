var React = require('react');
var Counter = require('./counter');
var Tweets = require('./tweets');
var Layout = require('./layout');

var App = React.createClass({
    render : function() {
        return (
        	<Layout />
        );
    }
});

module.exports = App;
