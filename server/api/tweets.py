from flask import Blueprint, jsonify
from api import crossdomain

tweetsAPI = Blueprint('tweetsAPI', __name__)

@tweetsAPI.route('/tweets')
@crossdomain(origin='*')
def tweets():
    tweet1 = {
        "message": "I just took a step",
        "user": {
            "username": "IamMike",
            "imageUrl": "https://pbs.twimg.com/profile_images/452246563155230720/H6fVrGy9.jpeg",
            "profileUrl": "https://twitter.com/Jumpman23"
        }
    }
    tweet2 = {
        "message": "Proof: The magic use real magic!",
        "imageUrl": "https://netlogx.com/wp-content/uploads/2014/01/magichat.jpg",
        "user": {
            "username": "ConspiratorFan",
            "imageUrl": "https://pbs.twimg.com/profile_images/3502828375/c391c8e9eafa7500c9c01f948bf47f11.jpeg",
            "profileUrl": "https://twitter.com/limbaugh"
        }
    }
    tweet3 = {
        "message": "I just took another step",
        "user": {
            "username": "IamMike",
            "imageUrl": "https://pbs.twimg.com/profile_images/452246563155230720/H6fVrGy9.jpeg",
            "profileUrl": "https://twitter.com/Jumpman23"
        }
    }
    tweet4 = {
        "message": "If the magic lose one more time I am going to murder someone",
        "user": {
            "username": "VengefulJoe",
            "imageUrl": "https://pbs.twimg.com/profile_images/635206073087995904/E-BUs5Ot.png",
            "profileUrl": "https://twitter.com/disturbed"
        }
    }

    data = [
        tweet1,
        tweet2,
        tweet3,
        tweet4,
        tweet1,
        tweet2,
        tweet3,
        tweet4,
        tweet1,
        tweet2,
        tweet3,
        tweet4,
        tweet1,
        tweet2,
        tweet3,
        tweet4
    ]

    return jsonify(tweets=data)
