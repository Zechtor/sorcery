import sched, time
from indexers.tweetIndexer import TweetIndexer
from indexers.newsIndexer import NewsIndexer
from indexers.teamIndexer import TeamIndexer
from indexers.scheduleIndexer import ScheduleIndexer

s = sched.scheduler(time.time, time.sleep)
def runIndexers(sc): 
    # execute all index functions here
    #TeamIndexer().index()
    TweetIndexer().index()
    #NewsIndexer().index()
    #ScheduleIndexer().index()
    sc.enter(60*15, 1, runIndexers, (sc,))

runIndexers(s)
#s.run()