var ScheduledGame = React.createClass({
    
    render : function() {
    var scheduleNodes = this.props.data.map(function (game) {
      return (
          {game.games}
      );
    });
    return (
      <div className="commentList">
        {scheduleNodes}
      </div>
    );
  }
});

module.exports = ScheduledGame;
