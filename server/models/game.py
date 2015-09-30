from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

class Game(Base):
    __tablename__ = 'game'
    id = Column(Integer, primary_key=True)
    createDate = Column(DateTime, nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'), nullable=False)
    teamScore = Column(Integer)
    # Foreign Key needed
    team2Id = Column(String(100), nullable=False)
    team2Score = Column(Integer)
    startTime = Column(DateTime, nullable=False)
    # Foreign Key needed
    homeTeamId = Column(Integer, nullable=False,)
    overtime = Column(Integer)

    @classmethod
    def getAll(class_):
        return session.query(class_).all()

    # serialize
    def serialize(self):
        game = {
            'id': self.id,
            'startTime': self.startTime,
            'overtime': self.overtime,
            'teams': [
                Team.getById(self.teamId).serialize({
                    "score": self.teamScore,
                    "isHome": self.homeTeamId == self.teamId
                }),
                Team.getById(self.team2Id).serialize({
                    "score": self.team2Score,
                    "isHome": self.homeTeamId == self.team2Id
                })
            ]
        }
        return game;