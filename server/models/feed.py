import sys
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, desc
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

class Feed(Base):
    __tablename__ = 'feed'
    id = Column(Integer, primary_key=True)
    checksum = Column(String(50))
    createDate = Column(DateTime, nullable=False)
    source = Column(String(100), unique=True, nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))
    url = Column(String(150), unique=True, nullable=False)

    def __init__(self, source, teamId, url):
        self.createDate = datetime.now()
        self.source = source
        self.teamId = teamId
        self.url = url

    @classmethod
    def getAll(class_):
        return session.query(class_).all()

    @classmethod
    def getByUrl(class_, url):
        return session.query(class_).filter(class_.url == url).first()

    @classmethod
    def save(class_, feed):
        existing = Feed.getByUrl(feed.url)
        if existing is None:
            session.add(feed)
        session.commit()
        try:
            #session.commit()
            return True 
        except:
            return False
