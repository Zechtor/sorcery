/* News Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var PartialLoader = require("./partialLoader");

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        return {
            news: NewsService.articles
        };
    },

    componentDidMount: function() {
        var self = this;
        self.load(1);

        // Attach scroll listener
        $("#news .container").scroll(function() {
            self.scroll();
        });
    },

    scroll: function() {
        // TODO: Clean-up
        if ($("#news .container").scrollTop() >= $("#news .list").height() - $("#news .container").height()) { 
            if (!this.state.isLoading) {  
                this.load(NewsService.page + 1, true);
            }
        }
    },

    load: function(page, partialLoad) {
        // Helper function to load data
        var self = this;

        if (partialLoad) {
            self.setState({ isPartialLoading: true });
        } else {
            self.setState({ isLoading: true });
        }

        NewsService.get(page, function() {
            self.setState({
                news: NewsService.articles,
                isLoading: false,
                isPartialLoading: false
            });
        });
    },

    refresh: function() {
        this.load(1);
        $("#news .container").scrollTop(0);
    },
    
    render : function() {
        return (
            <section id="news">
                <Header title="News">                
                    <button className="refresh" onClick={this.refresh}>Refresh</button>
                </Header>
                <Container>
                    <List>
                        { this.state.news.map(function(article) { 
                            return <NewsArticle data={article}></NewsArticle>;
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

var NewsArticle = React.createClass({

    render : function() {
        return (
            <li className="article">
                <div>
                    <img src={this.props.data.imageUrl} />
                </div>
                <div>
                    <a href={this.props.data.articleUrl} target="_blank">
                        <h3>{this.props.data.title}</h3>
                    </a>
                    <br />
                    {this.props.data.postDate}
                </div>
            </li>
        );
    }
});

module.exports = News;
