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
        // determine the height of 10 articles, this will become our scroll buffer
        var heightBuffer = 0;
        $("#news .article:lt(10)").each(function() {
            heightBuffer += $(this).height();
        });

        if ($("#news .container").scrollTop() >= $("#news .list").height() - $("#news .container").height() - heightBuffer) { 
            this.load(NewsService.page + 1, true);
        }
    },

    load: function(page, partialLoad) {
        var self = this;

        // do not trigger a load if one is already occuring or if you have reached the end
        if (self.state.isLoading || self.state.isPartialLoading) {
            return;
        }

        // do not continue to infinite scroll after reaching the end
        if (partialLoad && NewsService.eof) {
            return;
        }
        
        // set loading state
        if (partialLoad) {
            self.setState({isPartialLoading: true});
        } else {
            self.setState({isLoading: true});
        }

        // get data
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
                    <button className="refresh" onClick={this.refresh} />
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
