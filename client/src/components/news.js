/* News Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var Util = require("./util");

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        return {
            news: NewsService.news,
            isLoading: false,
            page: 1
        };
    },

    componentDidMount: function() {
        var self = this;
        self.load(1);

        // Attach scroll listener
        $(".news .container").scroll(function(){
            self.scroll();
        })
    },

    scroll: function() {
        // TODO: Clean-up
        if ($(".news .container").scrollTop() + 100 > $(".news .list").height() - $(".news .container").height()) { 
            if (!this.state.isLoading) {  
                this.setState({
                    isLoading:true,  
                });
                this.load(this.state.page + 1);
            }   
        }
    },

    load: function(page) {
        // Helper function to load data
        var self = this;
        self.state.page = page;
        self.setState({isLoading: true});

        NewsService.get(function() {
            var articles;
            if (page == 1) {
                articles = NewsService.news;
            } else {
                articles = self.state.news.concat(NewsService.news);
            }
            self.setState({
                news: articles,
                isLoading: false,
            });
        });
    },

    refresh: function() {
        this.load(1);
    },
    
    render : function() {
        return (
            <section className="news">
                <Header title="News">                
                    <input type="button" onClick={this.refresh} value="Refresh" />
                </Header>
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
