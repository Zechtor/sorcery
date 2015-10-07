/* Showcase Component
 */

var Util = require("./util");

var ScheduleService = require("../services/scheduleService");

var Showcase = React.createClass({

    getInitialState : function() {
        return {
            showcase: null
        };
    },

    componentDidMount : function() {
        // initial data load
        var that = this; // TODO: remove this dependency

        // wait for the schedule to return
        ScheduleService.get().then(function() {
            that.setState({
                showcase: ScheduleService.getShowcase()
            });
        });
    },

    render : function() {
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
    render : function () {
        var formattedDate = Util.DateTools.convertDate(this.props.data.startTime);
        var currentDate = new Date();
        var showcaseDate = new Date(this.props.data.startTime);
        var showcaseHeader;
        var homeTeam;
        var awayTeam;
        // Set home and away teams
        if (this.props.data.teams[0].isHome == true) {
            homeTeam = this.props.data.teams[0];
            awayTeam = this.props.data.teams[1];
        } else {
            homeTeam = this.props.data.teams[1];
            awayTeam = this.props.data.teams[0];
        }
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
