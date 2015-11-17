from datetime import datetime
from sqlalchemy import Column, Integer, Boolean, String, DateTime, ForeignKey
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

class Index(Base):
    __tablename__ = 'index'
    id = Column(Integer, primary_key=True)
    source = Column(String(100), nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))
    type = Column(String(100), nullable=False)
    value = Column(String(100), nullable=False)

    def __init__(self, teamId, value):
        self.source = 'twitter'
        self.teamId = teamId
        self.type = 'user'
        self.value = value

    @property
    def title(self):
        if self.source is 'twitter' and self.type is 'user':
            return '@' + self.value

        return self.value

    @classmethod
    def delete(class_, index):
        try:
            session.delete(index)
            session.commit()
        finally:
            session.close()

    @classmethod
    def getById(class_, id):
        result = session.query(class_).filter(class_.id == id).first()
        session.close()

        return result

    @classmethod
    def getByTeamId(class_, teamId):
        result = session.query(class_).filter(class_.teamId == teamId).all()
        session.close()

        return result

    @classmethod
    def save(class_, index):
        session.add(index)
        session.commit()