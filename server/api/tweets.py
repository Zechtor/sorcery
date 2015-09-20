from flask import Blueprint, jsonify
from api import crossdomain
from models.tweet import Tweet

tweetsAPI = Blueprint('tweetsAPI', __name__)

@tweetsAPI.route('/tweets')
@crossdomain(origin='*')
def tweets():
    tweetList = Tweet.getList(0, 10)
    serializedList = [t.serialize() for t in tweetList]

    return jsonify(tweets=serializedList)
