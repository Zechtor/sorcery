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

    game1 = {
        "teams": [
                    {
                        "id": 1,
                        "city": "Orlando",
                        "name": "Magic",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/ORL_logo.svg",
                        "abbreviation": "ORL",
                        "score": 100,
                        "isHome": True
                    },
                    {
                        "id": 2,
                        "city": "Chicago",
                        "name": "Bulls",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/CHI_logo.svg",
                        "abbreviation": "CHI",
                        "score": 90,
                        "isHome": False
                    }
                ],
                "startTime": "Fri, 16 Mar 2012 05:50:34 GMT",
                "overtime": 0
        }

    game2 = {
        "teams": [
                    {
                        "id": 1,
                        "city": "Orlando",
                        "name": "Magic",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/ORL_logo.svg",
                        "abbreviation": "ORL",
                        "score": 100,
                        "isHome": False
                    },
                    {
                        "id": 2,
                        "city": "Chicago",
                        "name": "Bulls",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/CHI_logo.svg",
                        "abbreviation": "CHI",
                        "score": 90,
                        "isHome": True
                    }
                ],
                "startTime": "Sat, 17 Mar 2012 05:50:34 GMT",
                "overtime": 0
        }

    game3 = {
        "teams": [
                    {
                        "id": 1,
                        "city": "Orlando",
                        "name": "Magic",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/ORL_logo.svg",
                        "abbreviation": "ORL",
                        "isHome": True
                    },
                    {
                        "id": 2,
                        "city": "Chicago",
                        "name": "Bulls",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/CHI_logo.svg",
                        "abbreviation": "CHI",
                        "isHome": False
                    }
                ],
                "startTime": "Sun, 18 Mar 2012 05:50:34 GMT",
        }

    game4 = {
        "teams": [
                    {
                        "id": 1,
                        "city": "Orlando",
                        "name": "Magic",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/ORL_logo.svg",
                        "abbreviation": "ORL",
                        "isHome": False
                    },
                    {
                        "id": 2,
                        "city": "Chicago",
                        "name": "Bulls",
                        "imageUrl": "http://stats.nba.com/media/img/teams/logos/CHI_logo.svg",
                        "abbreviation": "CHI",
                        "isHome": True
                    }
                ],
                "startTime": "Monday, 19 Mar 2012 05:50:34 GMT",
        }

    data = [
        game1, 
        game2,
        game1,
        game2,
        game1, 
        game2,
        game1,
        game2,
        game3,
        game4,
        game3,
        game4,
        game3,
        game4,
        game3,
        game4
    ]

    return jsonify(schedule = data)




