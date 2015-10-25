var Util = require("./util");

/* Container Component
 * Abstraction of a container
 * Handles scrolling and loading state for its content
 */
  
var Container = React.createClass({

    render: function() {
        var classes = Util.classNames({
            "container": true,
            "full": this.props.full
        });

        return (
            <div className={classes}>
                {this.props.children}        
            </div>
        );
    }
});

module.exports = Container;
