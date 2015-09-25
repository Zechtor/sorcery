var Nav = React.createClass({
    
    render : function() {
        return (
            <section className="nav">
                <button id="scheduleToggle">Schedule</button>
                <span>Nav</span>
                <button id="tweetToggle">Twitter</button>
            </section>
        );
    }
});

module.exports = Nav;
