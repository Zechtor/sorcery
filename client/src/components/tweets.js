/* Tweets Component
 */

var Container = require('./container');
var Header = require('./header');
var List = require('./list');

var TweetsService = require('../services/tweetsService');

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
            })
        });
    },

    render: function() {
        return (
            <section className="tweets">
                <Header title="Tweets" />
                <Container>
                    <List>
                        {this.state.tweets.map(function(tweet) {
                            return <Tweet></Tweet>
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
                Tweet
            </li>
        );
    }
});
    
module.exports = Tweets;
