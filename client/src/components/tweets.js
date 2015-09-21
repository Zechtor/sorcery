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
        })
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
                isLoading: false,
            });
        });
    },

    refresh: function() {
        this.load(1);
        $(".tweets .container").scrollTop(0)
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
