from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

from models import Base, session
from models.sport import Sport

class League(Base):
    __tablename__ = 'league'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    sportId = Column(Integer, ForeignKey('sport.id'))
    teams = relationship("Team", backref="League")

    def __init__(self, name, sportId):
        self.name = name
        self.sportId = sportId
        self.createDate = datetime.now()

    # serialize
    def serialize(self):
        league = {}
        return league;

    @classmethod
    def getAll(class_):
        return session.query(class_).all()

    @classmethod
    def getByName(class_, name):
        return session.query(class_).filter(class_.name == name).first()

    @classmethod
    def save(class_, league):
        existingLeague = League.getByName(league.name)
        if existingLeague is not None:
            return

        session.add(league)
        try:
            session.commit()
            return True 
        except:
            return False
