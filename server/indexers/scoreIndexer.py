import json, requests
from dateutil import parser

from models.game import Game

class ScoreIndexer():

    # this indexer is used to get scores and live updates the day of a game
    def index(self):
        scores = self.getScores()
        self.process(scores)

    def gameHasStarted(self, status):
        hasStarted = False
        try:
            parser.parse(status)
        except:
            hasStarted = True

        return hasStarted

    def getScores(self):
        scores = []
        url = 'http://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2015/scores/00_todays_scores.json'

        print url

        response = requests.get(url)
        rawData = response.json()
        rawGameData = rawData['gs']['g']

        for game in rawGameData:
            # do not record games if they have not started
            if self.gameHasStarted(game['stt']) is False:
                continue

            scoreData = {
                'gameId': game['gid'],
                'homeScore': game['h']['s'],
                'visitorScore': game['v']['s']
            }

            scores.append(scoreData)

        print json.dumps(scores)

        return scores

    def process(self, scores):
        for data in scores:
            self.processScore(data)

    def processScore(self, data):
        game = Game.getByExternalId(data['gameId'])
        if game is None:
            return

        game.homeTeamScore = data['homeScore']
        game.visitorTeamScore = data['visitorScore']
        Game.save(game)
