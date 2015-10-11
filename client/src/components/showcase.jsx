/* Showcase Component
 */

var Util = require("./util");

var LiveService = require("../services/liveService");
var ScheduleService = require("../services/scheduleService");

var Showcase = React.createClass({

    getInitialState: function() {
        return {
            showcase: null
        };
    },

    componentDidMount: function() {
        // initial data load
        var self = this; // TODO: remove this dependency

        // wait for the schedule to return
        ScheduleService.get().then(function() {
            self.setState({
                showcase: ScheduleService.getShowcase()
            }); 

            self.autoUpdate();
        });
    },

    autoUpdate: function() {
        self = this;
        var interval = 30 * 1000;

        if (ScheduleService.isLive()) {
            // if there is a live game, get data and renew in 30 seconds
            LiveService.get().then(function(data) {
                self.setState({
                    showcase: data
                });
            });
        } else {
            // if there is no live game, try again when the next game starts
            interval = ScheduleService.timeUntilNextGame();
        }

        setTimeout(function() {
            self.autoUpdate();
        }, interval);
    },

    render: function() {
        var showcaseStatus;
        showcaseStatus = this.state.showcase ?
            <ShowcaseDisplay data={this.state.showcase} /> : 
            <BlankDisplay />;
        return (
            <section id="showcase">
                {showcaseStatus}
            </section>
        );
    }

});

var ShowcaseDisplay = React.createClass({
    render: function () {
        var formattedDate = Util.DateTools.convertDate(this.props.data.startTime);
        var currentDate = new Date();
        var showcaseDate = new Date(this.props.data.startTime);
        var showcaseHeader;
        if (showcaseDate < currentDate) {
            showcaseHeader = "Last Game";
        } else {
            showcaseHeader = "Next Game";
        }
        return (
            <section className="item">
                <div className="status">
                    {showcaseHeader}
                </div>
                <div className="row">
                    <span className="spacer" />
                    <div className="team">
                        {this.props.data.teams[0].score}
                        <img src={this.props.data.teams[0].imageUrl} />
                    </div>
                    <span className="spacer" />
                    <div className="vs">
                        vs
                    </div>
                    <span className="spacer" />
                    <div className="team">
                        <img src={this.props.data.teams[1].imageUrl} />
                        {this.props.data.teams[1].score}
                    </div>
                    <span className="spacer" />
                </div>
                <div className="status">
                    { this.props.data.status ?
                        this.props.data.status
                    :
                        formattedDate
                    }
                </div>
            </section>
        );
    }
});

var BlankDisplay = React.createClass({

    render: function () {
        return (
            <div>
            </div>
        );
    }
});

module.exports = Showcase;
