window.React = require("react");
window.$ = require("jquery");

var About = require("./components/about");
var App = require("./components/app");
var Teams = require("./components/teams");

var RouterModule = require("react-router"),
    Router = RouterModule.Router,
    Route = RouterModule.Route,
    Redirect = RouterModule.Redirect;
var History = require("history");

require("./index.styl");

var history = History.useBasename(History.createHistory)({
    basename: ""
});

React.render((
    <Router history={history}>
        <Redirect from="/" to="/teams" />
        <Route path="/magic" component={App}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/teams" component={Teams}></Route>
        <Redirect from="/:teamName" to="/magic" />
    </Router>
), document.getElementById("root"));