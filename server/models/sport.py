from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref

from models import Base, session

class Sport(Base):
    __tablename__ = 'sport'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    leagues = relationship("League", backref="Sport")

    def __init__(self, name):
        self.name = name
        self.createDate = datetime.now()

    # serialize
    def serialize(self):
        sport = {}
        return sport;

    @classmethod
    def getAll(class_):
        result = session.query(class_).all()
        session.close()

        return result

    @classmethod
    def getByName(class_, name):
        result = session.query(class_).filter(class_.name == name).first()
        session.close()

        return result

    @classmethod
    def save(class_, sport):
        existingSport = Sport.getByName(sport.name)
        if existingSport is None:
            session.add(sport)

        result = sport
        try:
            session.commit()
        except:
            result = None
        finally:
            session.close()

        return result
