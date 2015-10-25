var Container = require("./container");
var Footer = require("./footer");
var Nav = require("./nav");

var About = React.createClass({

    render: function() {
        return (
            <div id="about" className="layout">
                <Nav title="TeamWatcher" />
                <Container full={true}>
                    <div className="content">
                        <h2>About</h2>
                        <p>
                            This is some about page magic!
                        </p>
                        <p>
                            For inquiries, please contact: <a href="mailto:help@teamwatcher.com">help@teamwatcher.com</a>
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
});

module.exports = About;
