import requests, md5
from base64 import b64encode

from models.tweet import Tweet

class TweetIndexer():

    # base method, entry point for the indexer
    def index(self):
        print '\nIndexing: Tweets\n'

        tweetData = []
        accessToken = self.requestBearerToken()

        tweetData = self.search(accessToken)
        self.process(tweetData)

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

        query = '?lang=en&count=100'
        if Tweet.getMostRecent(1) is not None:
            query += '&since_id=' + Tweet.getMostRecent(1).tweetId 
        query += '&q='

        # from users
        for user in users:
            query += "from:" + user + '+OR+'

        if len(users) > 0:
            query = query[:-4]

        # hashtags

        return query

    def search(self, accessToken):
        page = 1
        maxPage = 20
        tweetData = []
        query = self.initialQueryString

        # accumulate a list of tweet data from the twitter's search api
        while page <= maxPage:
            data, query = self.getTweets(accessToken, query)
            tweetData += data
            page += 1

            if query is None:
                break

        return tweetData

    def getTweets(self, accessToken, query):
        url = 'https://api.twitter.com/1.1/search/tweets.json' + query
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Bearer ' + accessToken
        }

        response = requests.get(url, headers=headers)
        results = response.json()

        tweetData = results['statuses']
        nextQuery = None
        if 'next_results' in results['search_metadata']:
            nextQuery = results['search_metadata']['next_results']

        return tweetData, nextQuery

    def process(self, tweetData):
        print 'tweets found: ' + str(len(tweetData)) + '\n'

        successCount = 0
        errorCount = 0
        retweetCount = 0

        for data in tweetData:
            if 'retweeted_status' in data:
                retweetCount += 1
                continue

            tweet = Tweet(data)
            result = Tweet.save(tweet)

            if result == True:
                successCount +=1
            else:
                errorCount += 1

        print 'Results:\n  tweets added: %d\n  retweets: %d\n  errors: %d\n' % (successCount, retweetCount, errorCount)

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
