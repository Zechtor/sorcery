import sys
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, desc
from sqlalchemy.orm import backref

from models import Base, session
from models.team import Team

class Tweet(Base):
    __tablename__ = 'tweet'
    id = Column(Integer, primary_key=True)
    tweetId = Column(String(50), unique=True, nullable=False)
    createDate = Column(DateTime, nullable=False)
    postDate = Column(DateTime, nullable=False)
    text = Column(String(300), nullable=False)
    imageUrl = Column(String(200))
    username = Column(String(30), nullable=False)
    userImageUrl = Column(String(200), nullable=False)
    teamId = Column(Integer, ForeignKey('team.id'))

    def __init__(self, data):
        self.tweetId = data['id']
        self.createDate = datetime.now()
        self.postDate= datetime.strptime(data['created_at'], '%a %b %d %H:%M:%S +0000 %Y')
        self.text = data['text'].strip()
        if 'entities' in data and 'media' in data['entities'] and data['entities']['media'][0] != None and 'media_url' in data['entities']['media'][0]:
            self.imageUrl = data['entities']['media'][0]['media_url']
        self.username = data['user']['screen_name']
        self.userImageUrl = data['user']['profile_image_url']
        self.teamId = data['teamId']

    # serialize
    def serialize(self):
        tweet = {
            'id': self.id,
            'tweetId': self.tweetId,
            'message': self.text,
            'postDate': self.postDate,
            'user': {
                'username': self.username,
                'imageUrl': self.userImageUrl,
                'profileUrl': self.profileUrl
            }
        }

        if (self.imageUrl != None):
            tweet["imageUrl"] = self.imageUrl

        return tweet;

    @property
    def profileUrl(self):
        return 'https://twitter.com/' + self.username

    @classmethod
    def getByExternalId(class_, externalId):
        result = session.query(class_).filter(class_.tweetId == externalId).first()
        session.close()

        return result

    @classmethod
    def getList(class_, teamId, start, count):
        result =  session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).offset(start).limit(count).all()
        session.close()

        return result

    @classmethod
    def getMostRecent(class_, teamId):
        result = session.query(class_).filter(class_.teamId == teamId).order_by(desc(class_.postDate)).first()
        session.close()

        return result

    @classmethod
    def save(class_, tweet):
        existingTweet = Tweet.getByExternalId(tweet.tweetId)
        if existingTweet is None:
            session.add(tweet)

        result = tweet
        try:
            session.commit()
        except:
            result = None
        finally:
            session.close()

        return result
