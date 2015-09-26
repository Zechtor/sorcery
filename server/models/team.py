from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import backref
from models import Base, db_session

class Team(Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True, nullable=False)
    city = Column(String(200), nullable=False)
    createDate = Column(DateTime, nullable=False)
    leagueId = Column(Integer, ForeignKey('league.id'))

    @classmethod
    def getAll(class_):
        return db_session.query(class_).all()

    # serialize
    def serialize(self):
        team = {}
        return team;