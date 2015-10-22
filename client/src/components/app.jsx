var React = require("react");
var Layout = require("./layout");
var Loader = require("./loader");
var q = require("q");

var NewsService = require("../services/newsService");
var ScheduleService = require("../services/scheduleService");
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
                self.setState({loading: false});
            });
        });
    },

    render : function() {
        return (
            <div>
                <Layout />
                <Loader fullScreen={true} loading={this.state.loading} />
            </div>
        );
    }
});

module.exports = App;
