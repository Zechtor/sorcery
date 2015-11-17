from flask import Blueprint, jsonify, request
from api import crossdomain

from models.team import Team
from models.feed import Feed
from models.index import Index

adminAPI = Blueprint('adminAPI', __name__)

@adminAPI.route('/admin')
@crossdomain(origin='*')
def admin():
    feeds = Feed.getAll()
    teams = Team.getAll()

    serializedTeams = []
    teamHash = {}

    for team in teams:
        serializedTeam = team.serialize(None)
        serializedTeam['tweeters'] = [{'id': i.id,'name': i.value} for i in Index.getByTeamId(team.id)]
    	serializedTeam['feeds'] = []
    	teamHash[serializedTeam['id']] = serializedTeam
        serializedTeams.append(serializedTeam)

    for feed in feeds:
    	team = teamHash[feed.teamId]
    	team['feeds'].append(feed.serialize())

    return jsonify(teams=serializedTeams)

@adminAPI.route('/admin/feed', methods=['POST'])
@crossdomain(origin='*')
def upsertFeed():
    data = request.form
    feed = None
    if not data['id']:
        feed = Feed(data['source'], data['teamId'], data['url'])
        Feed.save(feed)

    return jsonify(feed=None)

@adminAPI.route('/admin/feed/<int:feedId>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def deleteFeed(feedId):
    Feed.delete(Feed.getById(feedId))
    return jsonify(feed=None)

@adminAPI.route('/admin/team/activate', methods=['POST'])
@crossdomain(origin='*')
def activateTeam():
    data = request.form
    team = Team.getById(data['teamId'])
    team.active = data['active'] == 'true'
    Team.save(team)

    return jsonify(team=None)

@adminAPI.route('/admin/index', methods=['POST'])
@crossdomain(origin='*')
def addIndex():
    data = request.form
    index = Index(int(data['teamId']), data['value'])
    Index.save(index)

    return jsonify(index=None)

@adminAPI.route('/admin/index/<int:indexId>', methods=['DELETE', 'OPTIONS'])
@crossdomain(origin='*')
def deleteIndex(indexId):
    index = Index.getById(indexId)
    Index.delete(index)

    return jsonify(index=None)