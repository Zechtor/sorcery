import requests, md5
from base64 import b64encode
from urllib import quote

from models.tweet import Tweet
from models.team import Team
from models.index import Index

class TweetIndexer():

    # base method, entry point for the indexer
    def index(self, team):
        print '\nIndexing: Tweets\n'
        self.team = team

        indexes = Index.getByTeamId(team.id)
        if len(indexes) is 0:
            return

        tweetData = []
        accessToken = self.requestBearerToken()

        tweetData = self.search(accessToken, indexes)
        self.process(tweetData)

    def getQuery(self, indexes):
        hashtags = []
        users = [i.value for i in indexes]

        query = '?lang=en&count=100'
        mostRecentTweet = Tweet.getMostRecent(self.team.id)
        if mostRecentTweet is not None:
            query += '&since_id=' + mostRecentTweet.tweetId 
        query += '&q='

        # hashtags
        for hashtag in hashtags:
            query += quote('#') + hashtag + '+OR+'

        # trim the final or if there are no to append
        if len(hashtags) > 0 and len(users) < 0:
            query = query[:-4]

        # from users
        for user in users:
            query += 'from:' + user + '+OR+'

        if len(users) > 0:
            query = query[:-4]
        print query + '\n'
        return query

    def search(self, accessToken, indexes):
        page = 1
        maxPage = 20
        tweetData = []
        query = self.getQuery(indexes)

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

        if 'statuses' not in results:
            return [], None

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

            # input the teamId into the data package
            data['teamId'] = self.team.id

            tweet = Tweet(data)
            result = Tweet.save(tweet)

            if result is not None:
                successCount +=1
            else:
                errorCount += 1

        print 'Results:\n  tweets added: %d\n  retweets: %d\n  errors: %d\n' % (successCount, retweetCount, errorCount)

    # Oauth
    def requestBearerToken(self):
        # create token credentials using the consumer key and secret
        consumerKey = ''
        consumerSecret = ''
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
