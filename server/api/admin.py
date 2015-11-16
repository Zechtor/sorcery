from flask import Blueprint, jsonify, request
from api import crossdomain

from models.team import Team
from models.feed import Feed

adminAPI = Blueprint('adminAPI', __name__)

@adminAPI.route('/admin')
@crossdomain(origin='*')
def admin():
    feeds = Feed.getAll()
    teams = Team.getAll()

    serializedTeams = [t.serialize(None) for t in teams]

    teamHash = {}
    for team in serializedTeams:
    	team['feeds'] = []
    	teamHash[team['id']] = team

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