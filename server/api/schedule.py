from flask import Blueprint, jsonify
from api import crossdomain

from models.game import Game
from models.team import Team

scheduleAPI = Blueprint('scheduleAPI', __name__)

@scheduleAPI.route('/schedule')
@crossdomain(origin='*')
def schedule():
    teamId = int(request.args.get('teamId'))
    gameList = Game.getList(teamId)
    serializedList = [g.serialize() for g in gameList]

    return jsonify(games=serializedList)