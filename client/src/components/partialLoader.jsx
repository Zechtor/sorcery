var PartialLoader = React.createClass({
    render : function() {
        return (
            <div className="partialLoader">
                <ul className="loading">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        );
    }
});

module.exports = PartialLoader;
