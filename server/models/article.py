import md5
from dateutil import parser
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, desc

from models import Base, session

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True)
    articleUrl = Column(String(200), nullable=False)
    createDate = Column(DateTime, nullable=False)
    description = Column(String(2000), nullable=False)
    externalId = Column(String(50), unique=True, nullable=False)
    imageUrl = Column(String(500))
    postDate = Column(DateTime, nullable=False)
    source = Column(String(200), nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))
    title = Column(String(200), nullable=False)

    def __init__(self, data):
        # Based on Bing Search API
        self.articleUrl = data['articleUrl']
        self.createDate = datetime.now()
        self.description = data['description']
        self.externalId = data['externalId']
        self.imageUrl = data['imageUrl']
        self.postDate = parser.parse(data['postDate'], ignoretz=True)
        self.source = data['source']
        self.teamId = data['teamId']
        self.title = data['title']

    # serialize
    def serialize(self):
        article = {
            'id': self.id,
            'postDate': self.postDate,
            'title': self.title,
            'articleUrl': self.articleUrl,
            'source': self.source
        }

        if (self.imageUrl != None):
            article["imageUrl"] = self.imageUrl

        return article;

    @classmethod
    def getByExternalId(class_, externalId):
        result = session.query(class_).filter(class_.externalId == externalId).first()
        session.close()

        return result

    @classmethod
    def getList(class_, teamId, start, count):
        result = session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).offset(start).limit(count).all()
        session.close()

        return result

    @classmethod
    def getMostRecent(class_, teamId):
        result = session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).first()
        session.close()

        return result

    @classmethod
    def save(class_, article):
        result = article
        try:
            session.add(article)
            session.commit()
        except:
            result = None
        finally:
            session.close()

        return result
