# NBA Team Indexer
import json
from models.team import Team

class TeamIndexer():

	def index(self):
		teamList = self.loadData('./fixtures/teams.json')
		self.process(teamList)

	def loadData(self, fileName):
		return json.load(open(fileName))

	def process(self, teamList):
		for team in teamList:
			self.processTeam(team)

	def processTeam(self, teamData):
		print teamData