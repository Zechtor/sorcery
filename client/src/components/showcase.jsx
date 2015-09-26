/* Showcase Component
 */

var Container = require("./container");
var Header = require("./header");
var Loader = require("./loader");
var Util = require("./util");

var ScheduleService = require("../services/scheduleService");

var Showcase = React.createClass({

    getInitialState : function() {
        return {
            showcase: null,
            isLoading: true
        };
    },

    componentDidMount : function() {
        // initial data load
        var that = this; // TODO: remove this dependency
        ScheduleService.get(function() {
            that.setState({
                showcase: ScheduleService.getShowcase(),
                isLoading: false
            });
        });
    },

    render : function() {
        var showcaseStatus;
        showcaseStatus = this.state.showcase ?
        <ShowcaseDisplay data={this.state.showcase} /> : 
        <BlankDisplay />;
        return (
            <section className="showcase">
                <Header title="Showcase"></Header>
                <Container>
                    {showcaseStatus}
                </Container>
                { this.state.isLoading &&
                    <Loader />
                }
            </section>
        );
    }

});

var ShowcaseDisplay = React.createClass({
    render : function () {
        var formattedDate = Util.DateTools.convertDate(this.props.data.startTime);

        return (
            <section>
                <div className="game">
                    <div>
                        {this.props.data.team.location} {this.props.data.team.name} <br />
                        <img src={this.props.data.team.icon} /> <br />
                        {this.props.data.team.score} 
                    </div>
                    vs 
                    <div>
                        {this.props.data.opponent.location} {this.props.data.opponent.name} <br />
                        <img src={this.props.data.results.winner.icon} /> <br />
                        {this.props.data.opponent.score} 
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
