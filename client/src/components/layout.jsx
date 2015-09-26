var Showcase = require("./showcase");
var Nav = require("./nav");
var News = require("./news");
var Schedule = require("./schedule");
var Tweets = require("./tweets");

var Layout = React.createClass({
    
    render : function() {
        return (
            <div className="layout">
                <Nav />
                <section className="left">
                    <Schedule />
                </section>
                <section className="center">
                    <Showcase />
                    <News />
                </section>
                <section className="right">
                    <Tweets />
                </section>
            </div>
        );
    }
});

module.exports = Layout;
