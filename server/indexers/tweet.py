import requests
from base64 import b64encode

from models.tweet import Tweet

class TweetIndexer():

    @classmethod
    def index(class_):
        accessToken = class_.requestBearerToken()


        tweetData = class_.search(accessToken)
        class_.process(tweetData)

    @classmethod
    def search(class_, accessToken):
        hashtags = ['orlandomagic', 'magicbasketball']
        users = [
            'JoshuaBRobbins',
            'd_dedmon3',
            'EvanFourmizz',
            'nicholaf44',
            'tobias31',
            'VicOladipo',
            'OrlandoMagic',
            'Double0AG',
            'elfrid',
            'FOXSportsMagic',
            'DevMarble',
            'Quietstorm_32',
            'ShabazzNapier'
        ]

        url = 'https://api.twitter.com/1.1/search/tweets.json?&lang=en&count=100&q='
        #for hashtag in hashtags:
        #    url += '%23' + hashtag + '+'
        #url = url[:-1]

        if len(users) > 0:
            url += "from"

        for user in users:
            url += '@' + user + '+OR+'

        if len(users) > 0:
            url = url[:-4]

        print url

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
        }

        response = requests.get(url, headers=headers)
        results = response.json()
        print results

        return results['statuses']

    @classmethod
    def process(class_, tweetData):
        for data in tweetData:
            tweet = Tweet(data)
            Tweet.save(tweet)

    # Oauth
    @classmethod
    def requestBearerToken(class_):
        # create token credentials using the consumer key and secret
        consumerKey = 'rUh9w3a3Id4Hv0yPkjGCqgFXl'
        consumerSecret = 'm8lxatiid7toWXclpskkfGT4Xk9buTv4ONdMK0z6jlFyTJ49Zi'
        tokenCredentials = consumerKey + ':' + consumerSecret

        # base64 encode the token credentials
        encodedCrentials = b64encode(tokenCredentials)

        # prepare token request
        url = 'https://api.twitter.com/oauth2/token'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + encodedCrentials
        }
        payload = {
            'grant_type': 'client_credentials'
        }

        response = requests.post(url, headers=headers, data=payload)
        results = response.json()

        return results['access_token']
