var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Util = require("./util");
var Loader = require("./loader");

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        window.addEventListener("scroll", this.handleScroll);
        return {
            news: NewsService.news,
            isLoading: true
        };
    },

    componentDidMount: function() {
        this.load();
    },

    handleScroll: function() {
    },

    load: function() {
        // Helper function to load data
        var self = this;
        self.setState({isLoading: true});
        NewsService.get(function() {
            self.setState({
                news: NewsService.news,
                isLoading: false
            });
        });
    },

    loadMore: function() {
        var self = this;
        self.setState({isLoading: true});
        NewsService.get(function() {
            self.setState({
                news: self.state.news.concat(NewsService.news),
                isLoading: false
            });
        });
    },

    refresh: function() {
        this.loadMore();
    },
    
    render : function() {
        return (
            <section className="news">
                <Header title="News"/>
                <input type="button" onClick={this.refresh} value="Refresh" /> 
                <Container>
                    <List>
                        {this.state.news.map(function(article){ 
                            return <NewsArticle data={article} />;
                        })}
                    </List>
                    { this.state.isLoading &&
                        <Loader />
                    }
                </Container>
            </section>
        );
    }
});

var NewsArticle = React.createClass({
    render : function() {
        var formattedTime = Util.DateTools.convertDate(this.props.data.postDate);

        return (
            <li className="news">
                <div>
                    <img src={this.props.data.imageUrl} />
                </div>
                <div>
                    <a href={this.props.data.articleUrl} target="_blank">
                        <h3>{this.props.data.title}</h3>
                    </a>
                    <br />
                    {formattedTime}
                </div>
            </li>
        );
    }
});

module.exports = News;
