from sqlalchemy import Column, Integer, String, DateTime
from models import Base, db_session

class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer, primary_key=True)
    articleId = Column(String(50), nullable=False)
    createDate = Column(DateTime, nullable=False)
    postDate = Column(DateTime, nullable=False)
    title = Column(String(200), nullable=False)
    articleUrl = Column(String(200), nullabe=False)
    imageUrl = Column(String(200))

    @classmethod
    def getList(class_, start, count):
        return db_session.query(class_).offset(start).limit(count).all()

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
