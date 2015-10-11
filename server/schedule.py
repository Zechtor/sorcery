import sched, sys, time
from datetime import datetime

from indexers.newsIndexer import NewsIndexer
from indexers.teamIndexer import TeamIndexer
from indexers.tweetIndexer import TweetIndexer
from indexers.scheduleIndexer import ScheduleIndexer
from indexers.scoreIndexer import ScoreIndexer

from models.game import Game
from models.league import League
from models.sport import Sport

def main(args):

    if len(args) == 2 and args[1] == 'news':
        NewsScheduler().run()

    if len(args) == 2 and args[1] == 'schedule':
        indexSchedule()

    if len(args) == 2 and args[1] == 'scores':
        ScoreScheduler().run()

    if len(args) == 2 and args[1] == 'setup':
        setup()
        indexSchedule()

    if len(args) == 2 and args[1] == 'tweets':
        TweetScheduler().run()

## Sport and League
def setup(): 
    # setup sport league and team data
    sport = Sport('Basketball')
    Sport.save(sport)
    League.save(League('NBA', sport.id))
    TeamIndexer().index()

def indexSchedule():
    ScheduleIndexer().index('10/2/2015', 23)


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
