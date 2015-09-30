from flask import Blueprint, jsonify
from api import crossdomain
from models.game import Game

scheduleAPI = Blueprint('scheduleAPI', __name__)

@scheduleAPI.route('/schedule')
@crossdomain(origin='*')
def schedule():

    '''
    gameList = Game.getList(1)
    serializedList = [g.serialize() for g in gameList]

    return jsonify(games=serializedList)
    '''

    data = [{
            "teams": [
                {
                    "id": 1,
                    "city": "Orlando",
                    "name": "Magic",
                    "imageUrl": "http://uniformcritics.com/unis/logos/teams/orlando-magic.png",
                    "abbreviation": "ORL",
                    "score": 100,
                    "isHome": True
                },
                {
                    "id": 2,
                    "city": "Chicago",
                    "name": "Bulls",
                    "imageUrl": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png",
                    "abbreviation": "CHI",
                    "score": 90,
                    "isHome": False
                }
            ],
            "startTime": "Sun, 18 Mar 2012 05:50:34 GMT",
            "overtime": 0
       }]

    return jsonify(schedule = data)