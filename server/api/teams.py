from flask import Blueprint, jsonify, request
from api import crossdomain

from models.team import Team

teamsAPI = Blueprint('newsAPI', __name__)

@newsAPI.route('/teams')
@crossdomain(origin='*')
def news():
    teamsList = Team.getAll()
    serializedList = [t.serialize() for t in teamsList]

    return jsonify(teams=serializedList)