window.React = require("react");
window.$ = require("jquery");
var App = require("./components/app");

require("./index.styl");

// this is the application entry point for our react components
React.render(
    <App />, document.getElementById("root")
);
