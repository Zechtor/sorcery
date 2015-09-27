/* Tweets Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var PartialLoader = require("./partialLoader");

var TweetsService = require("../services/tweetsService");

var Tweets = React.createClass({
    
    getInitialState: function() {
        return {
            tweets: TweetsService.tweets
        };
    },

    componentDidMount: function() {
        var self = this;
        self.load(1);

        // Attach scroll listener
        $("#tweets .container").scroll(function() {
            self.scroll();
        });
    },

    scroll: function() {
        // TODO: Clean-up
        if ($("#tweets .container").scrollTop() >= $("#tweets .list").height() - $("#tweets .container").height()) { 
            if (!this.state.isLoading) {  
                this.load(TweetsService.page + 1, true);
            }   
        }
    },

    load: function(page, partialLoad) {
        // Helper function to load data
        var self = this;
        
        if (partialLoad) {
            self.setState({isPartialLoading: true});
        } else {
            self.setState({isLoading: true});
        }

        TweetsService.get(page, function() {
            self.setState({
                tweets: TweetsService.tweets,
                isLoading: false,
                partialLoading: false
            });
        });
    },

    refresh: function() {
        this.load(1);
        $("#tweets .container").scrollTop(0);
    },

    render: function() {
        return (
            <section id="tweets">
                <Header title="Tweets">
                    <button className="refresh" onClick={this.refresh}>Refresh</button>
                </Header>
                <Container>
                    <List>
                        {this.state.tweets.map(function(tweet) {
                            return <Tweet data={tweet}></Tweet>;
                        })}
                        { this.state.isPartialLoading &&
                            <PartialLoader />
                        }
                    </List>
                </Container>
                { this.state.isLoading &&
                    <Loader />
                }
			</section>
        );
    }
});

/* Tweet Component
 */

var Tweet = React.createClass({
    
    render: function() {

        function formatTweet(message) {
            // extract and format urls in tweets
            var linkRegex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            var formattedText = message.replace(linkRegex, "<a href='$1' target='_blank'>$1</a>");

            // extract and format profile mentions
            var profileRegex = /(@[A-Z0-9_]+)/gim;
            formattedText = formattedText.replace(profileRegex, "<a href='http://twitter.com/$1' target='_blank'>$1</a>");

            // find and replace new lines
            formattedText = formattedText.replace("\n", "<br>");

            return { __html: formattedText };
        }

        return (
            <li className="tweet">
                { this.props.data.imageUrl &&
                    <img src={this.props.data.imageUrl} />
                }
                <h3 dangerouslySetInnerHTML={formatTweet(this.props.data.message)} />
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
