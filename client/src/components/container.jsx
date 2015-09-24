/* Container Component
 * Abstraction of a container
 * Handles scrolling and loading state for its content
 */
 
var Container = React.createClass({

    render: function() {
        return (
            <div className="container">
                {this.props.children}        
            </div>
        );
    }
});

module.exports = Container;
