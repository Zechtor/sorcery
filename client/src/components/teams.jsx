var Container = require("./container");
var Footer = require("./footer");
var Nav = require("./nav");

var Teams = React.createClass({

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
                        <a href="/magic">
                            <img src="http://stats.nba.com/media/img/teams/logos/ORL_logo.svg" />
                        </a>
                        <p>Additional teams coming soon..</p>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
});

module.exports = Teams;
