window.React = require("react");
window.$ = require("jquery");

var App = require("./components/app");
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
        <Redirect from="/" to="/magic" />
        <Route path="/magic" component={App}></Route>
        <Redirect from="/:teamName" to="/magic" />
    </Router>
), document.getElementById("root"));