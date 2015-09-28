var PartialLoader = React.createClass({
    render : function() {
        return (
            <div className="partialLoader">
                <ol className="loading">
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        );
    }
});

module.exports = PartialLoader;
