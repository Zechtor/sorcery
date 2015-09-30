import sched, time
from indexers.tweet import TweetIndexer
from indexers.news import NewsIndexer
from indexers.team import TeamIndexer
from indexers.schedule import ScheduleIndexer

s = sched.scheduler(time.time, time.sleep)
def runIndexers(sc): 
    # execute all index functions here
    #TeamIndexer().index()
    #TweetIndexer().index()
    #NewsIndexer().index()
    #ScheduleIndexer().index()
    sc.enter(60*15, 1, runIndexers, (sc,))

runIndexers(s)
#s.run()