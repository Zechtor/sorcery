var Loader = React.createClass({
    render : function() {
        return (
            <div className="loader">
                <ol className="loading">
                  <li></li>
                  <li></li>
                  <li></li>
                </ol>
            </div>
        );
    }
});

module.exports = Loader;
