import sched, time
from indexers.tweet import TweetIndexer

s = sched.scheduler(time.time, time.sleep)
def runIndexers(sc): 
    # execute all index functions here
    TweetIndexer().index()
    sc.enter(60*15, 1, runIndexers, (sc,))

runIndexers(s)
s.run()