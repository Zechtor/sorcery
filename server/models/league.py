from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from models import Base, db_session

class League(Base):
    __tablename__ = 'league'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    sportId = Column(Integer, ForeignKey('sport.id'))
    teams = relationship("Team", backref="League")

    @classmethod
    def getAll(class_):
        return db_session.query(class_).all()

    # serialize
    def serialize(self):
        league = {}
        return league;
