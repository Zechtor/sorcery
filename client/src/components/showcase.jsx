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
        if (showcaseDate < currentDate) {
            showcaseHeader = "Last Game";
        } else {
            showcaseHeader = "Next Game";
        }
        return (
            <section className="item">
                <div className="date">
                    {showcaseHeader}
                </div>
                <div className="row">
                    <div className="team">
                        {this.props.data.teams[0].score}
                        <img src={this.props.data.teams[0].imageUrl} />
                    </div>
                    <div className="vs">
                        vs
                    </div>
                    <div className="team">
                        <img src={this.props.data.teams[1].imageUrl} />
                        {this.props.data.teams[1].score}
                    </div>
                </div>
                <div className="date">
                    {formattedDate}
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
