import json, requests
from datetime import datetime, timedelta
from dateutil import parser
from urllib import quote

from models.game import Game
from models.team import Team

class ScheduleIndexer():

    # this indexer is used to index future games or get scores for previous games
    def index(self, startDate, dayCount):
        results = self.search(startDate, dayCount)
        self.process(results)

    def parseScores(self, scores, data):
        # takes the initial scores data and converts it into an easier to use form
        for d in data:
            gameId = d['GAME_ID']
            result = {}

            # if the game is already in results use it, otherwise add a new object to that key
            if gameId in scores.keys():
                result = scores[gameId]

            team = Team.getByExternalId(d['TEAM_ID'])
            if team is not None:
                result[str(team.id)] = d['PTS']
                scores[gameId] = result

        return scores

    def parseStatus(self, status):
        # this method can return 3 codes
        # 0 - will occur in the future
        # 1 - is live
        # 2 - is finished
        isTime = True
        try:
            parser.parse(status)
        except:
            isTime = False

        if isTime == True:
            status = 0
        elif status != "Final":
            status = 1
        else:
            status = 2

        return status

    def process(self, data):
        for game in data['games']:
            self.processGame(game)

        for key in data['scores']:
            self.processScore(key, data['scores'][key])

    def processGame(self, data):
        # replace the nba team id's with our internal teami ids
        homeTeam = Team.getByExternalId(data['HOME_TEAM_ID'])
        visitorTeam = Team.getByExternalId(data['VISITOR_TEAM_ID'])

        if homeTeam is None or visitorTeam is None:
            return

        # status is dependent on other keys in the object
        data['STATUS'] = None

        # create a GAME_START key by combining GAME_DATE_EST and GAME_STATUS_TEXT
        # GAME_DATE_EST: 2015-10-03T00:00:00
        # GAME_STATUS_TEXT: 7:00 pm ET
        startTime = parser.parse(data['GAME_DATE_EST'])
        status = self.parseStatus(data['GAME_STATUS_TEXT'])

        if status == 0:
            # will happen - record start time
            time = parser.parse(data['GAME_STATUS_TEXT'])
            offset = 4 # there is a 4 hour offset between GMT and EST
            timeDelta = timedelta(hours=time.hour + offset, minutes=time.minute)
            startTime += timeDelta
        else:
            # we will record the status
            data['STATUS'] = data['GAME_STATUS_TEXT']

        data['START_TIME'] = startTime
        data['HOME_TEAM_ID'] = homeTeam.id
        data['VISITOR_TEAM_ID'] = visitorTeam.id

        game = Game(data)

        # TODO: update / save is a little dirty, mechanisms need to be cleaned up
        existingGame = Game.getByExternalId(game.externalId)
        if existingGame is not None:
            existingGame.status = data['STATUS']
            Game.save(existingGame)
        else:
            Game.save(game)

    def processScore(self, gameId, data):
        game = Game.getByExternalId(gameId)
        if game is None:
            return

        game.homeTeamScore = data[str(game.homeTeamId)]
        game.visitorTeamScore = data[str(game.visitorTeamId)]
        Game.save(game)

    def search(self, start, length):
        results = []
        games = []
        scores = {}

        offset = 0
        url = 'http://stats.nba.com/stats/scoreboardV2'

        while offset < length:
            query = '?LeagueID=00&gameDate=' + quote(start) + '&DayOffset=' + str(offset)
            print url + query
            response = requests.get(url + query)
            
            rawData = response.json()
            cleanData = {}

            for result in rawData['resultSets']:

                # parse a result set
                headers = result['headers']
                key = result['name']
                rows = result['rowSet']

                # parse the rows
                values = []
                for row in rows:

                    data = {}

                    index = 0
                    for col in row:
                        data[headers[index]] = col

                        index += 1

                    values.append(data)

                cleanData[key] = values

            games += cleanData['GameHeader']
            scores = self.parseScores(scores, cleanData['LineScore'])
            offset += 1

        results = {
            'games': games,
            'scores': scores
        }

        print json.dumps(results)
        return results
