from flask import Blueprint, jsonify
from api import crossdomain

from models.game import Game
from models.team import Team

liveAPI = Blueprint('liveAPI', __name__)

@liveAPI.route('/live')
@crossdomain(origin='*')
def live():
    teamId = int(request.args.get('team'))
    game = Game.getLive(teamId)
    
    result = {}
    if game is not None:
        result = game.serialize()

    return jsonify(game=result)