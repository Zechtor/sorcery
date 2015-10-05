from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# move this to a config at some point
engine = create_engine('mysql://root@localhost:3306/might?charset=utf8mb4&use_unicode=0', isolation_level="READ UNCOMMITTED")
session = scoped_session(sessionmaker(autocommit=False, autoflush=True, bind=engine))

Base = declarative_base()
Base.query = session.query_property()

def init_db():
    # import models
    import league, sport, team, tweet, game
    print "Initializing database"
    Base.metadata.create_all(bind=engine)
