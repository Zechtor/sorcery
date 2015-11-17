window.React = require("react");
window.$ = require("jquery");

var About = require("./components/about");
var Admin = require("./components/admin");
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
        <Route path="/about" component={About}></Route>
        <Route path="/teams" component={Teams}></Route>
        <Route path="/:teamName" component={App}></Route>
    </Router>
), document.getElementById("root"));