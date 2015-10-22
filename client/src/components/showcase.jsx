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

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            showcase: nextProps.showcase
        });

        this.autoUpdate();
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
        var game = this.props.data;

        function header() {
            var showcaseHeader;

            if (game.status == "Final") {
                showcaseHeader = "Last Game";
            } else if (game.status) {
                showcaseHeader = "Live";
            } else {
                showcaseHeader = "Next Game";
            }

            return showcaseHeader;
        }

        var homeTeam;
        var awayTeam;
        // Set home and away teams
        if (game.teams[0].isHome == true) {
            homeTeam = game.teams[0];
            awayTeam = game.teams[1];
        } else {
            homeTeam = game.teams[1];
            awayTeam = game.teams[0];
        }

        var formattedGameTime = Util.DateTools.convertDayTime(game.startTime);

        return (
            <section className="item">
                <div className="status">
                    {header()}
                </div>
                <div className="row">
                    <span className="spacer" />
                    <div className="team">
                        {awayTeam.score}
                        <img src={awayTeam.imageUrl} />
                    </div>
                    <span className="spacer" />
                    <div className="vs">
                        vs
                    </div>
                    <span className="spacer" />
                    <div className="team">
                        <img src={homeTeam.imageUrl} />
                        {homeTeam.score}
                    </div>
                    <span className="spacer" />
                </div>
                <div className="status">
                    { game.status ?
                        game.status
                    :
                        formattedGameTime
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
