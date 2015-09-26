from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from models import Base, session

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True)
    articleId = Column(String(50), nullable=False)
    createDate = Column(DateTime, nullable=False)
    postDate = Column(DateTime, nullable=False)
    title = Column(String(200), nullable=False)
    articleUrl = Column(String(200), nullable=False)
    imageUrl = Column(String(200))
    teamId = Column(Integer, ForeignKey('team.id'))

    @classmethod
    def getList(class_, teamId, start, count):
        return session.query(class_).filter(class_.teamId == teamId).offset(start).limit(count).all()

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
