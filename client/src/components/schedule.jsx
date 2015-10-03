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

    componentDidMount: function() {
        // initial data load
        var that = this; // TODO: remove this dependency
        ScheduleService.get().then(function() {
            that.setState({
                schedule: ScheduleService.schedule
            });
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
        var formattedDate = Util.DateTools.convertDate(this.props.data.startTime);
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
                <div className="row">
                    <div className="team">
                        {awayTeam.score}<img src={awayTeam.imageUrl} align="middle"/> 
                    </div>
                    <div className="at">
                    @
                    </div>
                    <div className="team">
                        <img src={homeTeam.imageUrl} />{homeTeam.score} 
                    </div>                
                </div>
                <span className="date">{formattedDate}</span>
            </li>
         );
    }
});

module.exports = Schedule;