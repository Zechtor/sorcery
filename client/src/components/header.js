/* Header Component 
 * Header for a section of content
 * title: title displayed in header div
 */
 
var Header = React.createClass({

    render: function() {
        return (
            <div className="header">
                {this.props.title}
                {this.props.children}
            </div>
        );
    }
});

module.exports = Header;
