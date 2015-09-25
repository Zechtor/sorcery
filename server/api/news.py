from flask import Blueprint, jsonify, request
from api import crossdomain
from models.article import Article

newsAPI = Blueprint('newsAPI', __name__)

@newsAPI.route('/news')
@crossdomain(origin='*')
def news():
    page = int(request.args.get('page'))
    pageSize = 10
    start = pageSize * (page - 1)

    articleList = Article.getList(start, pageSize)
    serializedList = [a.serialize() for a in articleList]

    return jsonify(articles=serializedList)