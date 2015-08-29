var Tweets = require('./tweets');
var Nav = require('./nav');

// component class
var Layout = React.createClass({
    
    // render what the component looks like
    render : function() {
        return (
            <div>
                <Nav />
                This is Sorcery
                <Tweets />
            </div>
        );
    }
});

// returns the component so other components can use it via require()
module.exports = Layout;
