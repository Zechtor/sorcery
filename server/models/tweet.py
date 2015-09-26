from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import backref
from models import Base, db_session

class Tweet(Base):
    __tablename__ = 'tweet'
    id = Column(Integer, primary_key=True)
    tweetId = Column(String(50), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    postDate = Column(DateTime, nullable=False)
    text = Column(String(200), nullable=False)
    imageUrl = Column(String(200))
    username = Column(String(30), nullable=False)
    userImageUrl = Column(String(200), nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))

    @property
    def profileUrl(self):
        return 'https://twitter.com/' + self.username

    @classmethod
    def getList(class_, teamId, start, count):
        return db_session.query(class_).filter(class_.teamId == teamId).offset(start).limit(count).all()

    # serialize
    def serialize(self):
        tweet = {
            'id': self.id,
            'tweetId': self.tweetId,
            'message': self.text,
            'user': {
                'username': self.username,
                'imageUrl': self.userImageUrl,
                'profileUrl': self.profileUrl
            }
        }

        if (self.imageUrl != None):
            tweet["imageUrl"] = self.imageUrl

        return tweet;
