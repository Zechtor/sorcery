var React = require("react");
var Loader = require("./loader");
var q = require("q");

var Nav = require("./nav");
var News = require("./news");
var Schedule = require("./schedule");
var Showcase = require("./showcase");
var Tweets = require("./tweets");

var NewsService = require("../services/newsService");
var ScheduleService = require("../services/scheduleService");
var TeamsService = require("../services/teamsService");
var TweetsService = require("../services/tweetsService");

var App = React.createClass({

    getInitialState: function() {
        return {
            loading: true
        };
    },

    componentDidMount: function() {
        this.load();
    },

    load: function() {
        // on startup, the application makes all of the initial data requests
        var self = this;

        TeamsService.get(this.props.params.teamName).then(function() {
            q.all([NewsService.get(1), ScheduleService.get(), TweetsService.get(1)]).then(function() {
                self.setState({
                    loading: false,
                    articles: NewsService.articles,
                    schedule: ScheduleService.schedule,
                    showcase: ScheduleService.getShowcase(),
                    tweets: TweetsService.tweets
                });
            });
        });
    },

    render : function() {
        return (
            <div>
                <div id="layout">
                    <Nav />
                    <section id="left">
                        <Schedule schedule={this.state.schedule} />
                    </section>
                    <section id="center">
                        <Showcase showcase={this.state.showcase} />
                        <News articles={this.state.articles} />
                    </section>
                    <section id="right">
                        <Tweets tweets={this.state.tweets} />
                    </section>
                </div>
                <Loader fullScreen={true} loading={this.state.loading} />
            </div>
        );
    }
});

module.exports = App;
