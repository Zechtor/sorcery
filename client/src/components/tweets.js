/* Tweets Component
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");

var TweetsService = require("../services/tweetsService");

var Tweets = React.createClass({
    
    getInitialState: function() {
        return {
            tweets: TweetsService.tweets
        };
    },

    componentDidMount: function() {
        // initial data load
        var that = this; // TODO: remove this dependency
        TweetsService.get(function() {
            that.setState({
                tweets: TweetsService.tweets
            });
        });
    },

    render: function() {
        return (
            <section className="tweets">
                <Header title="Tweets" />
                <Container>
                    <List>
                        {this.state.tweets.map(function(tweet) {
                            return <Tweet data={tweet}></Tweet>;
                        })}
                    </List>
                </Container>
			</section>
        );
    }
});

/* Tweet Component
 */

var Tweet = React.createClass({
    
    render: function() {
        return (
            <li className="tweet">
                { this.props.data.imageUrl &&
                    <img src={this.props.data.imageUrl} />
                }
                <h3>{this.props.data.message}</h3>
                <div>
                    <img src={this.props.data.user.imageUrl} />
                    <a href={this.props.data.user.profileUrl} target="_blank">
                        @{this.props.data.user.username}
                    </a>
                </div>
            </li>
        );
    }
});
    
module.exports = Tweets;
