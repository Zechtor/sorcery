var ScheduleService = require('../services/scheduleService');
var Container = require('./container');
var Header = require('./header');
var List = require('./list');
var Util = require('./util');

// Main schedule component
var Schedule = React.createClass({
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

// Individual Game component
var Game = React.createClass({
    render: function() {
        return (
            <li className="game">
                <GameInfo data={this.props.data} />
                <GameState data={this.props.data} />
            </li>
        );
    }
});

// GameInfo component displays date and opponent 
var GameInfo = React.createClass({
    render: function() {
        return (
            <div className="gameInfo">
                <GameDate data={this.props.data} />
                <GameOpponent data={this.props.data} />
            </div>
        );
    }
});

// Displays results of finished game or broadcast info of upcoming game
var GameState = React.createClass({
    render: function() {
        var gameStatus;
        gameStatus = (this.props.data.results.score != null) ?
            <GameResults data={this.props.data} /> : 
            <GameBroadcast data={this.props.data} />;
        return (
            <div className="gameState">
                {gameStatus}
            </div>
        );
    }
});

// Displays opponent info with ternary for away or home designation
var GameOpponent = React.createClass({
    render: function() {
        var gameType;
        gameType =  (this.props.data.isHome) ? 'vs' : '@';
        return (
            <div>
                {gameType} <img src={this.props.data.opponent.icon} /> {this.props.data.opponent.name}
            </div>
        );
    }
});

// Displays date of game nicely formatted - Day Month Date - eg Tues Sept 8
var GameDate = React.createClass({
    render: function () {
        // Correctly formats date of scheduled game
        var formattedDate = Util.DateTools.convertDate(this.props.data.startTime);
        return (
            <div>
                {formattedDate}
            </div>
        );
    }
});

// Diplays broadcast info for game
var GameBroadcast = React.createClass({
     render: function () {
        // Correctly formats time of scheduled game
        var formattedTime = Util.DateTools.convertTime(this.props.data.startTime);
        return (
            <div>
                {formattedTime}
                <br />
                 on <img src={this.props.data.localBroadcaster} />
            </div>
        );
    }
});

// Displays result of completed game
var GameResults = React.createClass({
    // TODO: Refactor DOM
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
