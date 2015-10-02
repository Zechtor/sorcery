var Util = require("./util");

var Loader = React.createClass({

    render : function() {
        var classes = Util.classNames({
            "loader": true,
            "fullScreen": this.props.fullScreen,
            "loading": this.props.loading,
            "hidden": !this.props.loading
        });

        return (
            <div className={classes}>
                <ol className="animation">
                  <li></li>
                  <li></li>
                  <li></li>
                </ol>
            </div>
        );
    }
});

module.exports = Loader;
