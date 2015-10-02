import json, requests
from datetime import datetime, timedelta
from dateutil import parser
from urllib import quote

from models.game import Game
from models.team import Team

class ScheduleIndexer():

    def index(self):
        games = self.search('10/2/2015', 22)
        self.process(games)

    def process(self, games):
        for data in games:
            self.processGame(data)

    def processGame(self, data):
        # replace the nba team id's with our internal teami ids
        homeTeam = Team.getByExternalId(data['HOME_TEAM_ID'])
        visitorTeam = Team.getByExternalId(data['VISITOR_TEAM_ID'])

        # create a GAME_START key by combining GAME_DATE_EST and GAME_STATUS_TEXT
        # GAME_DATE_EST: 2015-10-03T00:00:00
        # GAME_STATUS_TEXT: 7:00 pm ET
        startTime = parser.parse(data['GAME_DATE_EST'])
        time = parser.parse(data['GAME_STATUS_TEXT'])
        timeDelta = timedelta(hours=time.hour, minutes=time.minute)
        startTime += timeDelta
        data['START_TIME'] = startTime

        if homeTeam is None or visitorTeam is None:
            return

        data['HOME_TEAM_ID'] = homeTeam.id
        data['VISITOR_TEAM_ID'] = visitorTeam.id
        Game.save(Game(data))

    def search(self, start, length):
        games = []
        offset = 0
        url = 'http://stats.nba.com/stats/scoreboardV2'

        while offset <= length:
            query = '?LeagueID=00&gameDate=' + quote(start) + '&DayOffset=' + str(offset)
            response = requests.get(url + query)
            
            rawData = response.json()

            print url + query

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
            offset += 1

        print json.dumps(games)
        return games
