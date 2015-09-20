# This is a test data model to prove the end to end integration
from sqlalchemy import Column, Integer, String
from models import Base

class Test(Base):
    __tablename__ = 'test'
    id = Column(Integer, primary_key=True)
    data = Column(String(1000))