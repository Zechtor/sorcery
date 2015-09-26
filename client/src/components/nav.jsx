var Nav = React.createClass({

    toggleShelf: function(event) {
        var id = $(event.currentTarget).attr("id");
        
        var section;
        var other;
        if (id == "scheduleToggle") {
            section = $("#left");
            other = $("#right");
        } else if (id == "tweetToggle") {
            section = $("#right");
            other = $("#left");
        }

        if (section.hasClass("isOpen")) {
            section.removeClass("isOpen");   
        } else {
            section.addClass("isOpen");
            other.removeClass("isOpen");
        }
    },
    
    render: function() {
        return (
            <section id="nav">
                <button id="scheduleToggle" onClick={this.toggleShelf}>Schedule</button>
                <span>Sorcery</span>
                <button id="tweetToggle" onClick={this.toggleShelf}>Tweets</button>
            </section>
        );
    }
});

module.exports = Nav;
