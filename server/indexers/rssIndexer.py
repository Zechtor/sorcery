import requests, md5
from lxml import etree, html
import HTMLParser

from models.article import Article
from models.feed import Feed
from models.team import Team

class RssIndexer():

    def index(self, feed):
        items = self.search(feed)
        self.process(feed, items)

    def extractImage(self, url):
        imageUrl = None

        try:
            # allows us to request sites that would otherwise block us
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            }
            page = requests.get(url, headers=headers)
            root = html.fromstring(page.text)
            imageMeta = root.find("head/meta[@property='og:image']")

            if imageMeta is not None:
                imageUrl = imageMeta.attrib.get('content')
        except:
            imageUrl = None

        return imageUrl

    def process(self, feed, items):
        itemCount = len(items)
        successCount = 0

        for item in items:
            result = self.processItem(feed, item)

            if result == True:
                successCount += 1

        print 'Process results:\n  Article Count %d\n  Success Count %d' % (itemCount, successCount)

    def processItem(self, feed, item):
        url = item.findtext('link')
        externalId = md5.new(url).hexdigest()

        # if this article has already been indexed, skip it
        if Article.getByExternalId(externalId) is not None:
            return False

        # convert xml to object
        articleData = {
            'articleUrl': url,
            'description': item.findtext('description'),
            'externalId': externalId,
            'imageUrl': self.extractImage(url),
            'postDate': item.findtext('pubDate'),
            'source': feed.source,
            'teamId': feed.teamId,
            'title': HTMLParser.HTMLParser().unescape(item.findtext('title')),
        }

        return Article.save(Article(articleData))

    def search(self, feed):
        print 'Indexing: ' + 'http://www.nba.com/magic/rss.xml'

        items = []

        page = requests.get('http://www.nba.com/magic/rss.xml')
        rss = page.content

        # if the checksum has not changed, skip this feed
        checksum = md5.new(rss).hexdigest()
        if feed.checksum == checksum:
            return items
        else:
            feed.checksum = checksum
            Feed.save(feed) 

        root = etree.fromstring(rss)
        items = root.findall("channel/item")

        return items
