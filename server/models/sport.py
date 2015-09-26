from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref
from models import Base, db_session

class Sport(Base):
    __tablename__ = 'sport'
    id = Column(Integer, primary_key=True)
    name = Column(String(200), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    leagues = relationship("League", backref="Sport")

    @classmethod
    def getAll(class_):
        return db_session.query(class_).all()

    # serialize
    def serialize(self):
        sport = {}
        return sport;