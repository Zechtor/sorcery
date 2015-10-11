/* Tweets Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var Util = require("./util");

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
        // determine the height of 10 tweets, this will become our scroll buffer
        var heightBuffer = 0;
        $("#tweets .tweet:lt(10)").each(function() {
            heightBuffer += $(this).height();
        });

        if ($("#tweets .container").scrollTop() >= $("#tweets .list").height() - $("#tweets .container").height() - heightBuffer) { 
            this.load(TweetsService.page + 1, true);
        }
    },

    load: function(page, partialLoad) {
        var self = this;

        // do not trigger a load if one is already occuring
        if (self.state.loading || self.state.partialLoading) {
            return;
        }

        // do not continue to infinite scroll after reaching the end
        if (partialLoad && TweetsService.eof) {
            return;
        }
        
        // set loading state
        if (partialLoad) {
            self.setState({partialLoading: true});
        } else {
            self.setState({loading: true});
        }

        // get data
        TweetsService.get(page).then(function() {
            self.setState({
                tweets: TweetsService.tweets,
                loading: false,
                partialLoading: false
            });

            if (!partialLoad) {
                $("#tweets .container").scrollTop(0);
            }
        });
    },

    refresh: function() {
        this.load(1);
    },

    render: function() {
        var refreshClasses = Util.classNames({
            "refresh": true,
            "loading": this.state.loading
        });

        return (
            <section id="tweets">
                <Header title="Tweets">
                    <button className={refreshClasses} onClick={this.refresh} />
                </Header>
                <Container>
                    <List>
                        {this.state.tweets.map(function(tweet) {
                            return <Tweet data={tweet}></Tweet>;
                        })}
                        <Loader loading={this.state.partialLoading} partial={true} />
                    </List>
                </Container>
                <Loader loading={this.state.loading} />
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

        var formattedDate = Util.DateTools.timeAgo(this.props.data.postDate);

        return (
            <li className="tweet item">
                { this.props.data.imageUrl &&
                    <img src={this.props.data.imageUrl} />
                }
                <h3 dangerouslySetInnerHTML={formatTweet(this.props.data.message)} />
                <div>
                    <img src={this.props.data.user.imageUrl} />
                    <a href={this.props.data.user.profileUrl} target="_blank">
                        @{this.props.data.user.username}</a> - {formattedDate}
                </div>
            </li>
        );
    }
});
    
module.exports = Tweets;
