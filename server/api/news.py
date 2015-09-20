from flask import Blueprint, jsonify
from api import crossdomain

newsAPI = Blueprint('newsAPI', __name__)

@newsAPI.route('/news')
@crossdomain(origin='*')
def news():
    news1 = {
        "title": "Magic set to win lots of games",
        "articleUrl": "http://google.com",
        "imageUrl": "http://uniformcritics.com/unis/logos/teams/orlando-magic.png",
        "postDate": 1446087598
    }

    data = [
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1,
        news1
    ]

    return jsonify(news=data)