/* Schedule Component
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Util = require("./util");

var ScheduleService = require("../services/scheduleService");

// Main schedule component
var Schedule = React.createClass({

    getInitialState: function() {
        return {
            schedule: ScheduleService.schedule
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            schedule: nextProps.schedule
        });
    },

    render: function() {
        return (
            <section id="schedule">
                <Header title="Schedule" />
                <Container>
                    <List>
                        {this.state.schedule.map(function(game){
                            return <Game data={game} />;
                        })}
                    </List>
                </Container>
            </section>
        );
    }
});

var Game = React.createClass({ 
    render: function() {
        var formattedDate = Util.DateTools.convertDateNoDay(this.props.data.startTime);
        var formattedDayTime = Util.DateTools.convertDayTime(this.props.data.startTime);
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
        return (
            <li className="item">
                <span className="status">
                    {formattedDate}
                </span>
                <div className="row">
                    <span className="spacer" />
                    <div className="team">
                        {awayTeam.score}<img src={awayTeam.imageUrl} align="middle"/> 
                    </div>
                    <span className="spacer" />
                    <div className="at">
                    @
                    </div>
                    <span className="spacer" />
                    <div className="team">
                        <img src={homeTeam.imageUrl} />{homeTeam.score} 
                    </div>
                    <span className="spacer" />
                </div>
                <span className="status">
                    { this.props.data.status ?
                        this.props.data.status
                    :
                        formattedDayTime
                    }
                </span>
            </li>
         );
    }
});

module.exports = Schedule;