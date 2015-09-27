var Showcase = require("./showcase");
var Nav = require("./nav");
var News = require("./news");
var Schedule = require("./schedule");
var Tweets = require("./tweets");

var Layout = React.createClass({
    
    render : function() {
        return (
            <div id="layout">
                <Nav />
                <section id="left">
                    <Schedule />
                </section>
                <section id="center">
                    <Showcase />
                    <News />
                </section>
                <section id="right">
                    <Tweets />
                </section>
            </div>
        );
    }
});

module.exports = Layout;
