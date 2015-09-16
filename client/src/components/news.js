var Container = require('./container');
var Header = require('./header');
var List = require('./list');
var Util = require('./util');

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        return {
            news: NewsService.news
        };
    },

    componentDidMount: function() {
        // initial data load
        var that = this; // TODO: remove this dependency
        NewsService.get(function() {
            that.setState({
                news: NewsService.news
            });
        });
    },
    
    render : function() {
        return (
            <section className="news">
                <Header title="News" />
                <Container>
                    <List>
                        {this.state.news.map(function(article){ 
                            return <NewsArticle data={article} />;
                        })}
                    </List>
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
