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
                            TeamWatcher provides the latest up-to-the-minute info about your favorite sports teams. <br />
                            The site is constantly evolving, so please submit any comments or suggestions to <a href="mailto:feedback@teamwatcher.com">feedback@teamwatcher.com</a>
                        </p>
                        <p>
                            For technical support or other inquires please contact <a href="mailto:help@teamwatcher.com">help@teamwatcher.com</a>
                        </p>
                        <p>
                            <i>Disclaimer: The website has no affiliation to the NBA or any NBA team. All images and graphics are copyright of the NBA and their respective teams.</i>
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
});

module.exports = About;
