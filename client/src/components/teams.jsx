var Container = require("./container");
var Footer = require("./footer");
var Nav = require("./nav");

var TeamsService = require("../services/teamsService");

var Teams = React.createClass({

    getInitialState: function() {
        return {
            teams: []
        };
    },

    componentDidMount: function() {
        this.load();
    },

    load: function() {
        // on startup, the application makes all of the initial data requests
        TeamsService.get("").then(() => {
            this.setState({
                teams: TeamsService.teams
            })
        });
    },

    render: function() {
        return (
            <div id="teams" className="layout">
                <Nav title="TeamWatcher" />
                <Container full={true}>
                    <div className="content">
                        <h2>Teams</h2>
                        <p>
                            Select a team below for the latest scores, news and tweets.
                        </p>
                        <div className="grid"> 
                            { this.state.teams.map(function(team) { 
                                return <Team team={team}/>;
                            })}
                        </div>
                        <p>
                            Want to see your team on this list?<br/>
                            Let us know at <a href="mailto:feedback@teamwatcher.com">feedback@teamwatcher.com</a>
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
});

var Team = React.createClass({

    render: function() {
        var href = "/" + this.props.team.name
        var src = "http://stats.nba.com/media/img/teams/logos/" + this.props.team.abbreviation + "_logo.svg"

        return (
            <a href={href}>
                <img src={src} />
            </a>
        );
    }

})

module.exports = Teams;
