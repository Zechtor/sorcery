window.React = require("react");
window.$ = require("jquery");

var App = require("./components/app");
var RouterModule = require("react-router"),
    Router = RouterModule.Router,
    Route = RouterModule.Route;
var History = require("history");

require("./index.styl");

var View = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

var history = History.useBasename(History.createHistory)({
    basename: "/sorcery"
});

React.render((
    <Router history={history}>
        <Route path="/" component={View}>
            <Route path=":teamName" component={App}></Route>
        </Route>
    </Router>
), document.getElementById("root"));