/* Showcase Component
 */

var Container = require("./container");
var Header = require("./header");

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
                <Header title="Showcase"></Header>
                <Container>
                    {showcaseStatus}
                </Container>
            </section>
        );
    }

});

var ShowcaseDisplay = React.createClass({
    render : function () {

        return (
            <section>
                <div className="game">
                    <div className="team">
                        {this.props.data.teams[0].abbreviation}<br />
                        <img src={this.props.data.teams[0].imageUrl} /><br />
                        {this.props.data.teams[0].score}
                    </div>
                    <div className="vs">
                    vs
                    </div>
                    <div className="team">
                        {this.props.data.teams[1].abbreviation}<br />
                        <img src={this.props.data.teams[1].imageUrl} /><br />
                        {this.props.data.teams[1].score}
                    </div>
                </div>
                <div className="date">
                    {this.props.data.startTime}
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
