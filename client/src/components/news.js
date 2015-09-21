var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Util = require("./util");
var Loader = require("./loader");
var $ = require("jquery");

var NewsService = require("../services/newsService");

var News = React.createClass({

    getInitialState: function() {
        window.addEventListener("scroll", this.handleScroll);
        return {
            news: NewsService.news,
            isLoading: false,
            page: 0
        };
    },

    componentDidMount: function() {
        this.load();
    },

    handleScroll: function(event) {
        var windowHeight = $(window).height();
        var inHeight = window.innerHeight;
        var scrollT = this.getDOMNode().scrollTop;
        var scrollHeight = this.getDOMNode().scrollHeight;
        console.log("scrollT", scrollT);
        console.log("inHeight", inHeight);
        console.log("windowHeight", windowHeight);
        console.log("scrollHeight", scrollHeight);
        if(scrollT + 500 > scrollHeight){  //user reached at bottom
            if(!this.state.isLoading){  //to avoid multiple request 
                this.setState({
                    isLoading:true,  
                });
                this.loadMore();
            }   
        }
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
        // Pagination
        var self = this;
        var nextPage = this.state.page+1;

        self.setState({isLoading: true});
        NewsService.get(function() {
            self.setState({
                news: self.state.news.concat(NewsService.news),
                isLoading: false,
                page: nextPage
            });
        });
    },

    refresh: function() {
        var windowHeight = $(window).height();
        var inHeight = window.innerHeight;
        var scrollT = $(window).scrollTop();
        console.log("scrollT", scrollT);
        console.log("inHeight", inHeight);
        console.log("windowHeight", windowHeight);
        this.load();
    },
    
    render : function() {
        return (
            <section className="news">
                <Header title="News">                
                    <input type="button" onClick={this.refresh} value="Refresh" /> 
                    <input type="button" onClick={this.handleScroll} value="Load More" /> 
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
