var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Util = require("./util");

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        return {
            news: NewsService.news,
            isLoading: true
        };
    },

    load: function() {
        // Helper function to load data
        this.setState({isLoading: true});
        var self = this;
        NewsService.get(function() {
            self.setState({
                news: NewsService.news,
                isLoading: false
            });
        });
    },

    componentDidMount: function() {
        this.load();
    },

    refresh: function() {
        this.load();
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

var Loader = React.createClass({
    render : function() {
        return (
            <div className ="Loader">
            LOADING MAGIC
            </div>
            );
    }
});

module.exports = News;
