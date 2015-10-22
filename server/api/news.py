from flask import Blueprint, jsonify, request
from api import crossdomain

from models.article import Article
from models.team import Team

newsAPI = Blueprint('newsAPI', __name__)

@newsAPI.route('/news')
@crossdomain(origin='*')
def news():
	team = int(request.args.get('teamId'))
    page = int(request.args.get('page'))
    pageSize = 20
    start = pageSize * (page - 1)

    articleList = Article.getList(teamId, start, pageSize)
    serializedList = [a.serialize() for a in articleList]

    return jsonify(articles=serializedList)