import md5
from dateutil import parser
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, desc

from models import Base, session

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True)
    articleId = Column(String(50), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    postDate = Column(DateTime, nullable=False)
    title = Column(String(200), nullable=False)
    articleUrl = Column(String(200), nullable=False)
    source = Column(String(200), nullable=False)
    description = Column(String(500), nullable=False)
    imageUrl = Column(String(500))
    teamId = Column(Integer, ForeignKey('team.id'))

    def __init__(self, data):
        # Based on Bing Search API
        self.articleId = md5.new(data['Url']).hexdigest(),
        self.createDate = datetime.now()
        self.postDate = parser.parse(data['Date'], ignoretz=True)
        self.title = data['Title']
        self.articleUrl = data['Url']
        self.imageUrl = data['ImageUrl']
        self.source = data['Source']
        self.description = data['Description']
        self.teamId = data['teamId']

    # serialize
    def serialize(self):
        article = {
            'id': self.id,
            'articleId': self.articleId,
            'postDate': self.postDate,
            'title': self.title,
            'articleUrl': self.articleUrl
        }

        if (self.imageUrl != None):
            article["imageUrl"] = self.imageUrl

        return article;

    @classmethod
    def save(class_, article):
        existing = Article.getByArticleId(article.articleId) is not None
        if existing:
            return False

        try:
            session.add(article)
            session.commit()
            return True 
        except:
            return False
        
    @classmethod
    def getByArticleId(class_, articleId):
        return session.query(class_).filter(class_.articleId == articleId).first()

    @classmethod
    def getList(class_, teamId, start, count):
        return session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).offset(start).limit(count).all()

    @classmethod
    def getMostRecent(class_, teamId):
        return session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).first()
