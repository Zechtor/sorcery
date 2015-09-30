import json, requests
from urllib import quote

from models.game import Game
from models.team import Team

class ScheduleIndexer():

    def index(self):
        games = self.search('10/2/2015', 21)
        self.process(games)

    def process(self, games):
        for data in games:
            self.processGame(data)

    def processGame(self, data):
        # replace the nba team id's with our internal teami ids
        homeTeam = Team.getByExternalId(data['HOME_TEAM_ID'])
        visitorTeam = Team.getByExternalId(data['VISITOR_TEAM_ID'])

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
            print rawData

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

        return games
