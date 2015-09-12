from flask import Flask
from flask import jsonify
from livereload import Server

# CORS
# TODO: Refactor this and move it to its own file
# -*- coding: utf-8 -*-
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route('/')
def api_root():
    return 'This is Might, the API for Sorcery'


@app.route('/tweets')
@crossdomain(origin='*')
def tweets():
    data = [
        {
            "message": "I just took a step",
            "user": {
                "username": "IamMike",
                "imageUrl": "https://pbs.twimg.com/profile_images/452246563155230720/H6fVrGy9.jpeg",
                "profileUrl": "https://twitter.com/Jumpman23"
            }
        },
        {
            "message": "Proof: The magic use real magic!",
            "imageUrl": "https://netlogx.com/wp-content/uploads/2014/01/magichat.jpg",
            "user": {
                "username": "ConspiratorFan",
                "imageUrl": "https://pbs.twimg.com/profile_images/3502828375/c391c8e9eafa7500c9c01f948bf47f11.jpeg",
                "profileUrl": "https://twitter.com/Jumpman23"
            }
        },
        {
            "message": "I just took another step",
            "user": {
                "username": "IamMike",
                "imageUrl": "https://pbs.twimg.com/profile_images/452246563155230720/H6fVrGy9.jpeg",
                "profileUrl": "https://twitter.com/Jumpman23"
            }
        },
        {
            "message": "If the magic lose one more time I am going to murder someone",
            "user": {
                "username": "VengefulJoe",
                "imageUrl": "https://pbs.twimg.com/profile_images/635206073087995904/E-BUs5Ot.png",
                "profileUrl": "https://twitter.com/Jumpman23"
            }
        }
    ]

    return jsonify(tweets=data)


@app.route('/schedule')
@crossdomain(origin='*')
def schedule():
    data = [{"opponent": {
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
        {"opponent": {
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
        {"opponent": {
            "location": "Chicago",
            "name": "Bulls",
            "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                }

         },
        {"opponent": {
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
        {"opponent": {
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
        {"opponent": {
            "location": "Chicago",
            "name": "Bulls",
            "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                }

         },
        {"opponent": {
            "location": "Chicago",
            "name": "Bulls",
            "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                }

         },
        {"opponent": {
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
        {"opponent": {
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
        {"opponent": {
            "location": "Chicago",
            "name": "Bulls",
            "icon": "http://www.unitedcenter.com/cms/images/topnav/bulls_icon.png"
            },
            "startTime": 1446087598,
            "isHome": True,
            "localBroadcaster": "https://pbs.twimg.com/profile_images/464067276266696704/SND28fzh_normal.jpeg",
            "nationalBroadcaster": "Fox",
            "results": {
                }
         }]

    return jsonify(schedule=data)


@app.route('/news')
@crossdomain(origin='*')
def news():
    data = [{}, {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}]

    return jsonify(news=data)

if __name__ == '__main__':
    # server starts with live reload
    server = Server(app.wsgi_app)
    server.serve(port=5000)
