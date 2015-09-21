from flask import Blueprint, jsonify, request
from api import crossdomain
from models.tweet import Tweet

tweetsAPI = Blueprint('tweetsAPI', __name__)

@tweetsAPI.route('/tweets')
@crossdomain(origin='*')
def tweets():
    page = int(request.args.get('page'))
    pageSize = 10
    start = pageSize * (page - 1)

    tweetList = Tweet.getList(start, pageSize)
    serializedList = [t.serialize() for t in tweetList]

    return jsonify(tweets=serializedList)
