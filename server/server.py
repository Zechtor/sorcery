from flask import Flask
from livereload import Server

from api import sorceryAPI
from api.news import newsAPI
from api.schedule import scheduleAPI
from api.tweets import tweetsAPI
from api.live import liveAPI

import models

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_POOL_RECYCLE'] = 7200

# setup api routes
app.register_blueprint(sorceryAPI)
app.register_blueprint(newsAPI)
app.register_blueprint(scheduleAPI)
app.register_blueprint(tweetsAPI)
app.register_blueprint(liveAPI)

if __name__ == '__main__':
    models.init_db()

    # server starts with live reload
    server = Server(app.wsgi_app)
    server.serve(port=5000)
