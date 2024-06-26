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

var Team = React.createClass({

    activate: function(team, event) {
        Request.post("/admin/team/activate", {
            teamId: team.id,
            active: event.target.checked
        }).then(() => {
            window.location.reload();
        });
    },

    render: function() {
        let team = this.props.data;
        return (
            <li className="team">
                <div>
                    <h2>
                        {team.city} {team.name} ({team.feeds.length})
                    </h2>
                    <div>
                        Active: <input type="checkbox" data-id={team.id} checked={team.active} onChange={this.activate.bind(this, team)}/>
                    </div>
                    <Tweeters team={team} tweeters={team.tweeters}/>
                    <Feeds feeds={team.feeds} team={team}/>
                </div>
            </li>
        );
    }

});

/* Feeds */
var Feeds = React.createClass({

    render: function() {
        let hasFeeds = this.props.feeds.length > 0;
        return (
            <div>
                { hasFeeds &&
                    <div> 
                        Feeds:
                        { this.props.feeds.map((feed) => { 
                            return <Feed feed={feed} team={this.props.team}/>;
                        })}
                    </div>
                }
                <Feed new={true} team={this.props.team}/>
            </div>
        )
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

/* Twitter */
var Tweeters = React.createClass({

    render: function() {
        return (
            <div>
                Tweeters: <br/>
                { this.props.tweeters.map((tweeter) => {
                    return <Tweeter teamId={this.props.team.id} tweeter={tweeter}/> 
                })}
                <Tweeter new={true} teamId={this.props.team.id}/> 
            </div>
        );
    }
});

var Tweeter = React.createClass({

    delete: function(e) {
        e.preventDefault();

        const form = e.target;
        const indexId = form.querySelector('[name="indexId"]').value;

        Request.delete("/admin/index/" + indexId).then(() => {
            window.location.reload();
        });
    },

    save: function(e) {
        e.preventDefault();

        const form = e.target;
        const teamId = form.querySelector('[name="teamId"]').value;
        const value = form.querySelector('[name="value"]').value;
        const index = {
            teamId: teamId,
            value: value,
        };

        Request.post("/admin/index", index).then(() => {
            window.location.reload();
        });
    },

    render: function() {
        const submit = this.props.new ?
            <input type="submit" className="Save" value="Save"/> :
            <input type="submit" className="Delete" value="Delete"/>

        const action = this.props.new ?
            this.save :
            this.delete

        const tweeter = this.props.tweeter ? this.props.tweeter : {};
        return (
            <form onSubmit={action}>
                <input type="hidden" name="indexId" value={tweeter.id}/>
                <input type="hidden" name="teamId" value={this.props.teamId}/>
                <input type="text" name="value" value={tweeter.name}/>
                {submit}
            </form>
        );
    }
});

module.exports = Admin;