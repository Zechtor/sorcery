/* Tweets Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");

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
        $(".tweets .container").scroll(function(){
            self.scroll();
        });
    },

    scroll: function() {
        // TODO: Clean-up
        if ($(".tweets .container").scrollTop() >= $(".tweets .list").height() - $(".tweets .container").height()) { 
            if (!this.state.isLoading) {  
                this.setState({isLoading:true});
                this.load(TweetsService.page + 1);
            }   
        }
    },

    load: function(page) {
        // Helper function to load data
        var self = this;
        self.setState({isLoading: true});

        TweetsService.get(page, function() {
            self.setState({
                tweets: TweetsService.tweets,
                isLoading: false
            });
        });
    },

    refresh: function() {
        this.load(1);
        $(".tweets .container").scrollTop(0);
    },

    render: function() {
        return (
            <section className="tweets">
                <Header title="Tweets">
                    <input type="button" onClick={this.refresh} value="Refresh" />
                </Header>
                <Container>
                    <List>
                        {this.state.tweets.map(function(tweet) {
                            return <Tweet data={tweet}></Tweet>;
                        })}
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

        // extract and format urls in tweets
        var re = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var formattedText = this.props.data.message.replace(re, "<a href='$1' target='_blank'>$1</a>");

        function createMarkup() { return {__html: formattedText}; };

        return (
            <li className="tweet">
                { this.props.data.imageUrl &&
                    <img src={this.props.data.imageUrl} />
                }
                <h3 dangerouslySetInnerHTML={createMarkup()} />
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
