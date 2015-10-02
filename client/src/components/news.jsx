/* News Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var PartialLoader = require("./partialLoader");
var Util = require("./util");

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
        NewsService.get(page).then(function() {
            self.setState({
                news: NewsService.articles,
                isLoading: false,
                isPartialLoading: false
            });

            if (!partialLoad) {
                $("#news .container").scrollTop(0);
            }
        });
    },

    refresh: function() {
        this.load(1);
    },
    
    render : function() {
        var refreshClasses = Util.classNames({
            "refresh": true,
            "loading": this.state.isLoading
        });

        return (
            <section id="news">
                <Header title="News">                
                    <button className={refreshClasses} onClick={this.refresh} />
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

    openArticle: function() {
        window.open(this.props.data.articleUrl);
    },

    render : function() {
        return (
            <li className="article item" onClick={this.openArticle}>
                <img src={this.props.data.imageUrl} />
                <div>
                    <h3>{this.props.data.title}</h3>
                    <span>{this.props.data.postDate}</span>
                </div>
            </li>
        );
    }
});

module.exports = News;
