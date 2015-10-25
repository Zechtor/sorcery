/* Footer Component
 * Contains links for about and team pages
 */
var Footer = React.createClass({

    render: function() {
        return (
            <div id="footer">
                <a href="/teams">teams</a>
                <a href="/about">about</a>
            </div>
        );
    }
});

module.exports = Footer;