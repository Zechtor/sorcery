from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import backref

from models import Base, session
from models.league import League

class Team(Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    city = Column(String(200), nullable=False)
    createDate = Column(DateTime, nullable=False)
    imageUrl = Column(String(200), nullable=False)
    abbreviation = Column(String(50), nullable=False)
    leagueId = Column(Integer, ForeignKey('league.id'))

    @classmethod
    def getAll(class_):
        return session.query(class_).all()

    @classmethod
    def getById(class_, teamId):
        return session.query(class_).filter(class_.teamId == teamId).first()

    # serialize
    def serialize(self, data):
        team = {
            'id': self.id,
            'name': self.name,
            'city': self.city,
            'imageUrl': self.imageUrl,
            'abbreviation': self.abbreviation
        }

        if data:
            team.update(data)

        return team;