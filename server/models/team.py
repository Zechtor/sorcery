from datetime import datetime
from sqlalchemy import Column, Integer, Boolean, String, DateTime, ForeignKey
from sqlalchemy.orm import backref

from models import Base, session
from models.league import League

class Team(Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True)
    active = Column(Boolean, nullable=False)
    externalId = Column(String(50), unique=True, nullable=False)
    name = Column(String(100), unique=True, nullable=False)
    city = Column(String(200), nullable=False)
    createDate = Column(DateTime, nullable=False)
    imageUrl = Column(String(200), nullable=False)
    abbreviation = Column(String(50), nullable=False)
    leagueId = Column(Integer, ForeignKey('league.id'))

    def __init__(self, data):
        self.active = False
        self.name = data['name']
        self.city = data['city']
        self.createDate = datetime.now() 
        self.imageUrl = data['imageUrl']
        self.abbreviation = data['abbr']
        self.externalId = data['id']
        self.leagueId = 1

     # serialize
     # TODO: make serialize function take an optional parameter
    def serialize(self, data):
        team = {
            'id': self.id,
            'active': self.active,
            'name': self.name,
            'city': self.city,
            'imageUrl': self.imageUrl,
            'abbreviation': self.abbreviation
        }

        if data:
            team.update(data)

        return team;

    @classmethod
    def getAll(class_):
        result = session.query(class_).all()
        session.close()

        return result

    @classmethod
    def getAllActive(class_):
        result = session.query(class_).filter(class_.active == True).all()
        session.close()

        return result

    @classmethod
    def getById(class_, teamId):
        result = session.query(class_).filter(class_.id == teamId).first()
        session.close()

        return result

    @classmethod
    def getByExternalId(class_, externalId):
        result = session.query(class_).filter(class_.externalId == externalId).first()
        session.close()

        return result

    @classmethod
    def getByName(class_, name):
        result = session.query(class_).filter(class_.name == name).first()
        session.close()

        return result

    @classmethod
    def save(class_, team):
        result = team
        #try:
        session.add(team)
        session.commit()
        #except:
        #    result = None
        #finally:
        #    session.close()

        #return result