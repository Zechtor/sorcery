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
    source = Column(String(100), nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))
    url = Column(String(150), unique=True, nullable=False)

    def __init__(self, source, teamId, url):
        self.createDate = datetime.now()
        self.source = source
        self.teamId = teamId
        self.url = url

    # serialize
    def serialize(self):
        return {
            'id': self.id,
            'source': self.source,
            'url': self.url
        }

    @classmethod
    def delete(class_, feed):
        try:
            session.delete(feed)
            session.commit()
        finally:
            session.close()

    @classmethod
    def getAll(class_):
        result = session.query(class_).all()
        session.close()

        return result

    @classmethod
    def getById(class_, id):
        result = session.query(class_).filter(class_.id == id).first()
        session.close()

        return result

    @classmethod
    def getByUrl(class_, url):
        result = session.query(class_).filter(class_.url == url).first()
        session.close()

        return result

    @classmethod
    def save(class_, feed):
        existing = Feed.getByUrl(feed.url)
        if existing is None:
            session.add(feed)

        result = feed
        try:
            session.commit()
        except:
            result = None
        finally:
            session.close()

        return result
