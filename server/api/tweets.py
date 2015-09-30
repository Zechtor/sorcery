from flask import Blueprint, jsonify, request
from api import crossdomain

from models.tweet import Tweet
from models.team import Team

tweetsAPI = Blueprint('tweetsAPI', __name__)

@tweetsAPI.route('/tweets')
@crossdomain(origin='*')
def tweets():
    team = Team.getByName('magic')
    page = int(request.args.get('page'))
    pageSize = 20
    start = pageSize * (page - 1)

    tweetList = Tweet.getList(team.id, start, pageSize)
    serializedList = [t.serialize() for t in tweetList]

    return jsonify(tweets=serializedList)
