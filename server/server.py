from flask import Flask
from livereload import Server

from api import sorceryAPI
from api.news import newsAPI
from api.schedule import scheduleAPI
from api.tweets import tweetsAPI

import models

app = Flask(__name__)
app.config['DEBUG'] = True

# setup api routes
app.register_blueprint(sorceryAPI)
app.register_blueprint(newsAPI)
app.register_blueprint(scheduleAPI)
app.register_blueprint(tweetsAPI)

if __name__ == '__main__':
    # wipe and load db
    models.init_db()

    # server starts with live reload
    server = Server(app.wsgi_app)
    server.serve(port=5000)
