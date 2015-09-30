import sched, time
from indexers.tweet import TweetIndexer
from indexers.news import NewsIndexer
from indexers.team import TeamIndexer

s = sched.scheduler(time.time, time.sleep)
def runIndexers(sc): 
    # execute all index functions here
    TweetIndexer().index()
    #NewsIndexer().index()
    sc.enter(60*15, 1, runIndexers, (sc,))

#runIndexers(s)
#s.run()
TeamIndexer().index()