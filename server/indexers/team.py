# NBA Team Indexer
import json
from models.team import Team

class TeamIndexer():

	def index(self):
		teams = self.loadData('./fixtures/teams.json')
		self.process(teams)

	def loadData(self, fileName):
		return json.load(open(fileName))

	def process(self, teams):
		for data in teams:
			self.processTeam(data)

	def processTeam(self, data):
		teamData['imageUrl'] = 'http://stats.nba.com/media/img/teams/logos/' + teamData['abbr'].upper() + '_logo.svg'
		Team.save(Team(teamData))