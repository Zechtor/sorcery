from flask import Blueprint, jsonify
from api import crossdomain

from models.game import Game
from models.team import Team

scheduleAPI = Blueprint('scheduleAPI', __name__)

@scheduleAPI.route('/schedule')
@crossdomain(origin='*')
def schedule():
    gameList = Game.getList(Team.getByName('magic').id)
    serializedList = [g.serialize() for g in gameList]

    return jsonify(games=serializedList)