from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, asc, or_, and_
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

class Game(Base):
    __tablename__ = 'game'
    id = Column(Integer, primary_key=True)
    createDate = Column(DateTime, nullable=False)
    externalId = Column(String(50), unique=True, nullable=False)
    # Foreign Key needed
    homeTeamId = Column(Integer, nullable=False,)
    homeTeamScore = Column(Integer)
    overtime = Column(Integer)
    startTime = Column(DateTime, nullable=False)
    status = Column(String(100))
    # Foreign Key needed
    visitorTeamId = Column(String(100), nullable=False)
    visitorTeamScore = Column(Integer)

    def __init__(self, data):
        self.externalId = data['GAME_ID']
        self.createDate = datetime.now()
        self.homeTeamId = data['HOME_TEAM_ID']
        self.visitorTeamId = data['VISITOR_TEAM_ID']
        self.startTime = data['START_TIME']
        if data['STATUS'] is not None:
            self.status = data['STATUS']

    # serialize
    def serialize(self):
        homeTeamExtensions = { "isHome": True }
        if self.homeTeamScore is not None:
            homeTeamExtensions['score'] = self.homeTeamScore

        visitorTeamExtensions = { "isHome": False }
        if self.visitorTeamScore is not None:
            visitorTeamExtensions['score'] = self.visitorTeamScore

        game = {
            'id': self.id,
            'startTime': self.startTime,
            'overtime': self.overtime,
            'teams': [
                Team.getById(self.homeTeamId).serialize(homeTeamExtensions),
                Team.getById(self.visitorTeamId).serialize(visitorTeamExtensions)
            ]
        }

        if self.status is not None:
            game['status'] = self.status

        return game;

    @classmethod
    def getByExternalId(class_, externalId):
        return session.query(class_).filter(class_.externalId == externalId).first()

    @classmethod
    def getList(class_, teamId):
        return session.query(class_).filter(or_(class_.homeTeamId == teamId, class_.visitorTeamId == teamId)).order_by(asc(class_.startTime)).all()

    @classmethod
    def getLive(class_):
        return session.query(class_).filter(and_(class_.startTime < datetime.utcnow(), or_(class_.status != 'Final', class_.status == None))).order_by(asc(class_.startTime)).first()

    @classmethod
    def getNext(class_):
        return session.query(class_).filter(class_.startTime > datetime.utcnow()).order_by(asc(class_.startTime)).first()

    @classmethod
    def save(class_, game):
        existingGame = Game.getByExternalId(game.externalId)
        if existingGame is None:
            session.add(game)

        try:
            session.commit()
            return True 
        except:
            return False