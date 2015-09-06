var ScheduledGame = React.createClass({
    
    render : function() {
      return (
          <section>
          <div>
            {this.props.data.map(function(game){ 
              return ( 
                <GameNode data={game} />
                );
            })}
          </div>
          </section>
      );
  }
});

var GameNode = React.createClass({
  render: function () {
    return (
    <div>
      <GameOpponent data={this.props.data} />
      <GameTime data={this.props.data} />
    </div>
    );
  }
});

var GameOpponent = React.createClass({
  render: function () {
  return (
    <li>
      {this.props.data.opponent.name}
      <img src={this.props.data.opponent.icon} />
    </li>
    );
    }
});

var GameTime = React.createClass({
  convertDate: function () {
    var date = new Date(parseFloat(this.props.data.startTime));
    {
    return (    (date.getMonth() + 1) + "/" +
    date.getDate() + "/" +
    date.getFullYear() + " " +
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds()
    );
  }
  },

  render: function () {
  return (
<div>
convertDate
{this.props.data.startTime}
</div>
    );
    }
});

module.exports = ScheduledGame;


