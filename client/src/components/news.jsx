/* News Components
 */

var Container = require("./container");
var Header = require("./header");
var List = require("./list");
var Loader = require("./loader");
var Util = require("./util");

var NewsService = require("../services/newsService");

var scrollAnchor = "#center";
var scrollThreshold = 210;

var News = React.createClass({

    getInitialState: function() {
        return {
            news: NewsService.articles
        };
    },

    componentWillReceiveProps: function(nextProps) {
        console.log('weee');
        this.setState({
            news: nextProps.articles,
            loading: false
        });
    },

    componentDidMount: function() {
        $(scrollAnchor).scroll(() => {
            this.scroll(scrollAnchor);
        });

        $(scrollAnchor).scroll(() => {
            if ($(scrollAnchor).scrollTop() >= scrollThreshold) {
                $(scrollAnchor + " .header").addClass("fixed");
            }
            else {
                $(scrollAnchor + " .header").removeClass("fixed");
            }
        });
    },

    scroll: function(scrollAnchor) {
        // determine the height of 10 articles, this will become our scroll buffer
        var heightBuffer = 0;

        $("#news .article:lt(10)").each(function() {
            heightBuffer += $(this).height();
        });

        if ($(scrollAnchor).scrollTop() >= $("#news .list").height() - $(scrollAnchor).height() - heightBuffer) { 
            this.load(NewsService.page + 1, true);
        }
    },

    load: function(page, partialLoad) {
        // do not trigger a load if one is already occuring or if you have reached the end
        if (this.state.loading || this.state.partialLoading) {
            return;
        }

        // do not continue to infinite scroll after reaching the end
        if (partialLoad && NewsService.eof) {
            return;
        }
        
        // set loading state
        if (partialLoad) {
            this.setState({partialLoading: true});
        } else {
            this.setState({loading: true});
        }

        // get data
        NewsService.get(page).then(() => {
            this.setState({
                news: NewsService.articles,
                loading: false,
                partialLoading: false
            });
        });

        if (!partialLoad) {
            var duration = $(scrollAnchor).scrollTop() < scrollThreshold ? 250 : 0;
            $(scrollAnchor).animate({ scrollTop: scrollThreshold }, duration);
        }
    },

    refresh: function() {
        this.load(1);
    },
    
    render : function() {
        var refreshClasses = Util.classNames({
            "refresh": true,
            "loading": this.state.loading
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
                        <Loader loading={this.state.partialLoading} partial={true} />
                    </List>
                </Container>
                <Loader loading={this.state.loading} />
            </section>
        );
    }
});

var NewsArticle = React.createClass({

    openArticle: function() {
        window.open(this.props.data.articleUrl);
    },

    render : function() {
        var formattedDate = Util.DateTools.timeAgo(this.props.data.postDate);
        return (
            <li className="article item" onClick={this.openArticle}>
                <img src={this.props.data.imageUrl} />
                <div>
                    <h3>{this.props.data.title}</h3>
                    <span className="source">{this.props.data.source} - {formattedDate}</span>
                </div>
            </li>
        );
    }
});

module.exports = News;
