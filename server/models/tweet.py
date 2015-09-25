from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

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

    def __init__(self, data):
        self.tweetId = data['id']
        self.createDate = datetime.now()
        self.postDate = datetime.now()
        self.text = data['text']
        if 'entities' in data and 'media' in data['entities'] and data['entities']['media'][0] != None and 'media_url' in data['entities']['media'][0]:
            self.imageUrl = data['entities']['media'][0]['media_url']
        self.username = data['user']['screen_name']
        self.userImageUrl = data['user']['profile_image_url']
        self.teamId = 1

    @property
    def profileUrl(self):
        return 'https://twitter.com/' + self.username

    @classmethod
    def save(class_, tweet):
        session.add(tweet)
        try:
            session.commit() 
        except:
            print 'there was an error'

    @classmethod
    def getList(class_, teamId, start, count):
        return session.query(class_).filter(class_.teamId == teamId).offset(start).limit(count).all()

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
