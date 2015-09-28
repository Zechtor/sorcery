var Loader = React.createClass({
    render : function() {
        return (
            <div className="loader">
                <ul className="loading">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
            </div>
        );
    }
});

module.exports = Loader;
