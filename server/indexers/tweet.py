import requests
from base64 import b64encode

from models.tweet import Tweet

class TweetIndexer():

    @property
    def initialQueryString(self):
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

        query = '?lang=en&count=20&q='
        #for hashtag in hashtags:
        #    url += '%23' + hashtag + '+'
        #url = url[:-1]

        if len(users) > 0:
            query += "from"

        for user in users:
            query += '@' + user + '+OR+'

        if len(users) > 0:
            query = query[:-4]

        print query
        return query

    def index(self):
        accessToken = self.requestBearerToken()

        # to begin get up to 5 pages worth
        page = 1
        query = self.initialQueryString
        while page <= 20:
            tweetData, query = self.search(accessToken, query)
            print tweetData
            print query
            self.process(tweetData)
            page += 1

    def search(self, accessToken, query):
        url = 'https://api.twitter.com/1.1/search/tweets.json' + query
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
        }

        response = requests.get(url, headers=headers)
        results = response.json()

        print results['search_metadata']['next_results']

        return results['statuses'], results['search_metadata']['next_results']

    def process(self, tweetData):
        for data in tweetData:
            if 'retweeted_status' in data:
                continue

            tweet = Tweet(data)
            Tweet.save(tweet)

    # Oauth
    def requestBearerToken(self):
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
