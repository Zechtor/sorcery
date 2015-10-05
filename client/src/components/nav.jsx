var Nav = React.createClass({

    toggleShelf: function(event) {
        var toggle = $(event.currentTarget);
        var id = toggle.attr("id");

        // toggle the element
        var currentlySelected = toggle.hasClass("isSelected");

        $(".navToggle").removeClass("isSelected");
        if (currentlySelected) {
            toggle.removeClass("isSelected");   
        } else {
            toggle.addClass("isSelected");
        }
        
        // apply toggle to the layout
        var section;
        var other;
        if (id == "leftToggle") {
            section = $("#left");
            other = $("#right");
        } else if (id == "rightToggle") {
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
                <button id="leftToggle" className="navToggle" onClick={this.toggleShelf} />
                <span>Sorcery</span>
                <button id="rightToggle" className="navToggle" onClick={this.toggleShelf} />
            </section>
        );
    }
});

module.exports = Nav;
