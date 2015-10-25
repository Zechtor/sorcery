import sched, sys, time
from datetime import datetime

from indexers.newsIndexer import NewsIndexer
from indexers.rssIndexer import RssIndexer
from indexers.teamIndexer import TeamIndexer
from indexers.tweetIndexer import TweetIndexer
from indexers.scheduleIndexer import ScheduleIndexer
from indexers.scoreIndexer import ScoreIndexer

from models.feed import Feed
from models.game import Game
from models.league import League
from models.sport import Sport
from models.team import Team

def main(args):

    if len(args) == 2 and args[1] == 'news':
        RssScheduler().run()

    if len(args) == 2 and args[1] == 'schedule':
        indexSchedule()

    if len(args) == 2 and args[1] == 'scores':
        ScoreScheduler().run()

    if len(args) == 2 and args[1] == 'setup':
        setup()

    if len(args) == 2 and args[1] == 'tweets':
        TweetScheduler().run()

## Sport and League
def setup(): 
    # setup sport league and team data

    # Sports
    sport = Sport('Basketball')
    Sport.save(sport)

    # Leagues
    League.save(League('NBA', sport.id))

    # Teams
    TeamIndexer().index()

    # Feeds
    magic = Team.getByName('magic')
    Feed.save(Feed('NBA.com', magic.id, 'http://www.nba.com/magic/rss.xml'))
    Feed.save(Feed('Orlando Sentinel', magic.id, 'http://feeds.feedburner.com/orlandosentinel/sports/basketball/magic'))
    Feed.save(Feed('Orlando Pinstriped Post', magic.id, 'http://feeds.feedburner.com/sportsblogs/orlandopinstripedpost'))
    Feed.save(Feed('Orlando Magic Daily', magic.id, 'http://orlandomagicdaily.com/feed/'))

    warriors = Team.getByName('warriors')
    Feed.save(Feed('NBA.com', warriors.id, 'http://www.nba.com/warriors/rss.xml'))

def indexSchedule():
    ScheduleIndexer().index('10/27/2015', 200)


class NewsScheduler():
    s = sched.scheduler(time.time, time.sleep)

    @property
    def interval(self):
        return 2 * 60 * 60

    def schedule(self):
        NewsIndexer().index()
        self.s.enter(self.interval, 1, self.schedule, ())

    def run(self):
        self.schedule()
        self.s.run()


class ScoreScheduler():
    s = sched.scheduler(time.time, time.sleep)

    @property
    def interval(self):
        interval = 60 * 60

        # the score scheduler increases in frequency during lives games
        game = Game.getLive(None)
        if game is not None:
            interval = 30
            return interval

        # if there are no live games, it will time itself against the next game
        game = Game.getNext()
        if game is not None:
            timeDelta = game.startTime - datetime.utcnow()
            interval = timeDelta.seconds
            return interval

        return interval

    def schedule(self):
        ScoreIndexer().index()
        self.s.enter(self.interval, 1, self.schedule, ())

    def run(self):
        self.schedule()
        self.s.run()

class RssScheduler():
    s = sched.scheduler(time.time, time.sleep)

    @property
    def interval(self):
        return 30 * 60

    def schedule(self):
        # Index all of the rss feeds in a single pass
        feeds = Feed.getAll()
        for feed in feeds:
            RssIndexer().index(feed)

        self.s.enter(self.interval, 1, self.schedule, ())

    def run(self):
        self.schedule()
        self.s.run()

class TweetScheduler():
    s = sched.scheduler(time.time, time.sleep)

    @property
    def interval(self):
        return 15 * 60

    def schedule(self):
        TweetIndexer().index()
        self.s.enter(self.interval, 1, self.schedule, ())

    def run(self):
        self.schedule()
        self.s.run()

main(sys.argv)
