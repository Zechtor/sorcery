var Container = require("./container");
var List = require("./list");
var Nav = require("./nav");

var Request = require("../services/request");
var TeamsService = require("../services/teamsService");

var Admin = React.createClass({

    getInitialState: function() {
        return {
            teams: []
        };
    },

    componentWillMount: function() {
        this.load();
    },

    load: function() {
        Request.get("/admin").then((data) => {
            this.setState({
                teams: data.teams
            })
        });
    },

    render: function() {
        return (
            <div id="admin" className="layout">
                <Nav title="Admin"/>
                <Container full={true}>
                    <List>
                        { this.state.teams.map(function(team) { 
                            return <Team data={team}/>;
                        })}
                    </List>
                </Container>
            </div>
        );
    }

});

var Feed = React.createClass({

    save: function(e) {
        e.preventDefault();

        const form = e.target;
        const id = form.querySelector('[name="id"]').value;
        const source = form.querySelector('[name="source"]').value;
        const teamId = form.querySelector('[name="teamId"]').value;
        const url = form.querySelector('[name="url"]').value;
        const feed = {
            id: id,
            source: source,
            teamId: teamId,
            url: url
        };

        Request.post("/admin/feed", feed).then(() => {
            window.location.reload();
        });
      },

    delete: function(id) {
        Request.delete("/admin/feed/" + id).then(() => {
            window.location.reload();
        });
    },

    render: function() {
        const feed = this.props.feed ? this.props.feed : {};
        const team = this.props.team;
        return (
            <div className="feed">
                <form onSubmit={this.save}>
                    <input type="hidden" name="id" value={feed.id}/>
                    <input type="hidden" name="teamId" value={team.id}/>
                    <table>
                        <tr>
                            <td>
                                Source:
                            </td>
                            <td>
                                <input type="text" name="source" value={feed.source}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Url:
                            </td>
                            <td>
                                <input type="text" name="url" value={feed.url}/>
                            </td>
                        </tr> 
                        <tr>
                            <td>
                            </td>
                            <td>
                                <input type="submit" className="save" value="Save"/>
                            </td>
                        </tr> 
                    </table>
                </form>
                { !this.props.new &&
                    <button className="delete" onClick={this.delete.bind(this, feed.id)}>Delete</button>
                }
            </div>
        );
    }

});

var Team = React.createClass({

    render: function() {
        let team = this.props.data;
        let hasFeeds = team.feeds.length > 0;
        return (
            <li className="team">
                <div>
                    <h2>
                        {team.city} {team.name} ({team.feeds.length})
                    </h2>
                    { hasFeeds &&
                        <div> 
                            { team.feeds.map(function(feed) { 
                                return <Feed feed={feed} team={team}/>;
                            })}
                        </div>
                    }
                    <Feed new={true} team={team}/>
                </div>
            </li>
        );
    }

});

module.exports = Admin;