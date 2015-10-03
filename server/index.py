import sched, sys, time

from indexers.newsIndexer import NewsIndexer
from indexers.teamIndexer import TeamIndexer
from indexers.tweetIndexer import TweetIndexer
from indexers.scheduleIndexer import ScheduleIndexer

from models.sport import Sport
from models.league import League

def index(args):

	if len(args) == 2 and args[1] == 'setup':
		runOnce()
		return

	ts = sched.scheduler(time.time, time.sleep)
	scheduleTweets(ts)
	ts.run()

	#ns = sched.scheduler(time.time, time.sleep)
	#scheduleNews(ns)
	#ns.run()

def runOnce(): 
    # indexers that only needed to be run rarely
    sport = Sport('Basketball')
    Sport.save(sport)
    League.save(League('NBA', sport.id))
    TeamIndexer().index()
    ScheduleIndexer().index()

def scheduleTweets(sc): 
    TweetIndexer().index()
    sc.enter(60 * 15, 1, scheduleTweets, (sc,))

def scheduleNews(sc): 
    NewsIndexer().index()
    sc.enter(12 * 60 * 15, 1, scheduleNews, (sc,))

index(sys.argv)
