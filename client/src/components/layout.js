var LastGame = require('./lastgame');
var Nav = require('./nav');
var News = require('./news');
var Schedule = require('./schedule');
var Tweets = require('./tweets');

var Layout = React.createClass({
    
    render : function() {
        return (
            <div className="layout">
                <Nav />
                <section className="left">
                    <Schedule />
                </section>
                <section className="center">
                    <News />
                    <LastGame />
                </section>
                <section className="right">
                    <Tweets />
                </section>
            </div>
        );
    }
});

module.exports = Layout;
