import sched, sys, time
from datetime import datetime

from indexers.newsIndexer import NewsIndexer
from indexers.teamIndexer import TeamIndexer
from indexers.tweetIndexer import TweetIndexer
from indexers.scheduleIndexer import ScheduleIndexer
from indexers.scoreIndexer import ScoreIndexer

from models.sport import Sport
from models.league import League

def index(args):

    if len(args) == 2 and args[1] == 'setup':
        setup()
        indexSchedule()

    if len(args) == 2 and args[1] == 'tweets':
        indexTweets()

    if len(args) == 2 and args[1] == 'news':
        indexNews()

    if len(args) == 2 and args[1] == 'schedule':
        indexSchedule()

    if len(args) == 2 and args[1] == 'scores':
        indexScores()

## Sport and League
def setup(): 
    # setup sport league and team data
    sport = Sport('Basketball')
    Sport.save(sport)
    League.save(League('NBA', sport.id))
    TeamIndexer().index()

## Games ##
def indexScores():
    ScoreIndexer().index()

def indexSchedule():
    ScheduleIndexer().index('10/2/2015', 23)

## News ##
def indexNews():
    ns = sched.scheduler(time.time, time.sleep)
    scheduleNews(ns)
    ns.run()

def scheduleNews(sc): 
    NewsIndexer().index()
    sc.enter(12 * 60 * 15, 1, scheduleNews, (sc,))

## Tweets ##
def indexTweets():
    ts = sched.scheduler(time.time, time.sleep)
    scheduleTweets(ts)
    ts.run()

def scheduleTweets(sc): 
    TweetIndexer().index()
    sc.enter(60 * 15, 1, scheduleTweets, (sc,))

index(sys.argv)
