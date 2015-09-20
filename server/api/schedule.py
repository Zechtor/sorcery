from flask import Blueprint, jsonify
from api import crossdomain

scheduleAPI = Blueprint('scheduleAPI', __name__)

@scheduleAPI.route('/schedule')
@crossdomain(origin='*')
def schedule():
    data = [
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Chicago",
                    "name": "Bulls",
                    "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Golden State",
                "name": "Warriors",
                "icon": "https://pbs.twimg.com/profile_images/1154397156/new-warriors-logo_normal.jpg"
            },
            "startTime": 1446247951,
            "isHome": False,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Orlando",
                    "name": "Magic",
                    "icon": "http://uniformcritics.com/unis/logos/teams/orlando-magic.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox"
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Chicago",
                    "name": "Bulls",
                    "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Golden State",
                "name": "Warriors",
                "icon": "https://pbs.twimg.com/profile_images/1154397156/new-warriors-logo_normal.jpg"
            },
            "startTime": 1446247951,
            "isHome": False,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Orlando",
                    "name": "Magic",
                    "icon": "http://uniformcritics.com/unis/logos/teams/orlando-magic.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox"
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox"
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Chicago",
                    "name": "Bulls",
                    "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Golden State",
                "name": "Warriors",
                "icon": "https://pbs.twimg.com/profile_images/1154397156/new-warriors-logo_normal.jpg"
            },
            "startTime": 1446247951,
            "isHome": False,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                "score": "100 - 0",
                "overtime":  0,
                "winner": {
                    "location": "Orlando",
                    "name": "Magic",
                    "icon": "http://uniformcritics.com/unis/logos/teams/orlando-magic.png"
                }
            }
        },
        {
            "opponent": {
                "location": "Chicago",
                "name": "Bulls",
                "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox"
        }
    ]

    return jsonify(schedule=data)
