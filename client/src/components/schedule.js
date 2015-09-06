var ScheduleService = require('../services/scheduleService');
var Container = require('./container');
var Header = require('./header');
var List = require('./list');

var Schedule = React.createClass({

	// setting the state of a component
    getInitialState: function() {
        ScheduleService.get();
        return ScheduleService;
    },

     
    render: function() {
        return (
            <section className="schedule">
                <Header title="Schedule" />
                <Container>
                    <List>
                        {this.state.games.map(function(game){ 
                            return ( 
                                <Game data={game} />
                            );
                        })}                   
                    </List>
                </Container>
            </section>
        );
    }
});

var Game = React.createClass({
    render: function() {
        return (
            <li className="game">
                <div className="gameListing">
                    <div className="gameInfo">
                        <GameInfo data={this.props.data} />
                    </div>
                    <div className="gameState">
                        <GameState data={this.props.data} />
                    </div>
                </div>
            </li>
        );
    }
});

var GameInfo = React.createClass({
    render: function() {
        var gameType;
        if (this.props.data.isHome) {
            gameType = <HomeGameOpponent data={this.props.data} />;
        } else {
            gameType = <AwayGameOpponent data={this.props.data} />;
        }
        return (
            <div>
                <GameDate data={this.props.data} />
                {gameType}
            </div>
        );
    }
});

var GameState = React.createClass({
    render: function() {
        var gameStatus;
        if (this.props.data.results.score != null) {
            gameStatus = <GameResults data={this.props.data} />;
        } else {
            gameStatus = <GameBroadcast data={this.props.data} />;
        }
        return (
            <div>
                {gameStatus}
            </div>
        );
    }

});

var HomeGameOpponent = React.createClass({
    render: function() {
        return (
            <div>
                vs <img src={this.props.data.opponent.icon} /> {this.props.data.opponent.name}
            </div>
            );
    }
});

var AwayGameOpponent = React.createClass({
    render: function() {
        return (
            <div>
                @ <img src={this.props.data.opponent.icon} /> {this.props.data.opponent.name}
            </div>
        );
    }
});

var GameDate = React.createClass({
    // gets date of scheduled game
    convertDate: function () {
    var d = new Date(this.props.data.startTime * 1000);

    // sets day of week
    var dayArray = new Array(7);
    dayArray[0]=  "Sun";
    dayArray[1] = "Mon";
    dayArray[2] = "Tues";
    dayArray[3] = "Wed";
    dayArray[4] = "Thurs";
    dayArray[5] = "Fri";
    dayArray[6] = "Sat";
    var day = dayArray[d.getDay()];  

    // sets month 
    var monthArray = new Array(12);
    monthArray[0]=  "Jan";
    monthArray[1] = "Feb";
    monthArray[2] = "March";
    monthArray[3] = "April";
    monthArray[4] = "May";
    monthArray[5] = "June";
    monthArray[6] = "July";
    monthArray[7] = "Aug";
    monthArray[8] = "Sept";
    monthArray[9] = "Oct";
    monthArray[10] = "Nov";
    monthArray[11] = "Dec";
    var month = monthArray[d.getMonth()];

    // sets date
    var date = d.getDate().toString();

    return day + " " + month + " " + date;
  },

    render: function () {
        return (
            <div>
                {this.convertDate()}
            </div>
        );
    }
});

var GameBroadcast = React.createClass({
    // gets time of scheduled game
    convertTime: function () {
    var date = new Date(this.props.data.startTime * 1000);
    return date.toLocaleTimeString();
  },

    render: function () {
        return (
            <div>
                {this.convertTime()} 
                <br />
                 on <img src={this.props.data.localBroadcaster} />
            </div>
        );
    }
});

var GameResults = React.createClass({
    render: function () {
        return (
            <div>
                W: <img src={this.props.data.results.winner.icon} />
                <br />
                {this.props.data.results.score}
            </div>
        );
    }
});

module.exports = Schedule;
