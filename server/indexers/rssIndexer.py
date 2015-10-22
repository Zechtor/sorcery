import requests, md5
from lxml import etree, html
import HTMLParser

from models.article import Article
from models.feed import Feed
from models.team import Team

class RssIndexer():

    def index(self, feed):
        rss = self.search(feed)
        if rss is not None:
            self.process(feed, rss)

        print 'Finished indexing: ' + feed.source

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

    def process(self, feed, rss):
        items = []

        isAtom = None in rss.nsmap and rss.nsmap[None] == 'http://www.w3.org/2005/Atom'
        if isAtom is True:
            items = self.getAtomItems(rss)
        else:
            items = self.getRssItems(rss)

        itemCount = len(items)
        successCount = 0

        for item in items:
            result = False
            if isAtom is True:
                result = self.processAtomItem(feed, item)
            else:
                result = self.processRssItem(feed, item)

            if result is not None:
                successCount += 1

        print 'Process results:\n  Article Count %d\n  Success Count %d' % (itemCount, successCount)

    def search(self, feed):
        print 'Indexing: ' + feed.source

        items = []
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
        }
        page = requests.get(feed.url, headers=headers)
        rss = page.content

        # if the checksum has not changed, skip this feed
        checksum = md5.new(rss).hexdigest()
        if feed.checksum == checksum:
            return None
        else:
            feed.checksum = checksum
            Feed.save(feed) 

        return etree.fromstring(rss)

    # RSS
    def getRssItems(self, rss):
        items = rss.findall("channel/item")

        return items

    def processRssItem(self, feed, item):
        url = item.findtext('link')
        externalId = md5.new(url).hexdigest()

        # if this article has already been indexed, skip it
        if Article.getByExternalId(externalId) is not None:
            return False

        # convert xml to object
        articleData = {
            'articleUrl': url,
            'description': item.findtext('description')[:2000] if item.find('description') is not None else '',
            'externalId': externalId,
            'imageUrl': self.extractImage(url),
            'postDate': item.findtext('pubDate'),
            'source': feed.source,
            'teamId': feed.teamId,
            'title': HTMLParser.HTMLParser().unescape(item.findtext('title')),
        }

        return Article.save(Article(articleData))

    # ATOM
    def getAtomItems(self, rss):
        items = rss.findall("{http://www.w3.org/2005/Atom}entry")

        return items

    def processAtomItem(self, feed, item):
        url = item.find('{http://www.w3.org/2005/Atom}link').attrib.get('href')
        externalId = md5.new(url).hexdigest()

        # if this article has already been indexed, skip it
        if Article.getByExternalId(externalId) is not None:
            return False

        # convert xml to object
        articleData = {
            'articleUrl': url,
            'description': item.findtext('{http://www.w3.org/2005/Atom}content')[:2000],
            'externalId': externalId,
            'imageUrl': self.extractImage(url),
            'postDate': item.findtext('{http://www.w3.org/2005/Atom}published'),
            'source': feed.source,
            'teamId': feed.teamId,
            'title': HTMLParser.HTMLParser().unescape(item.findtext('{http://www.w3.org/2005/Atom}title')),
        }

        return Article.save(Article(articleData))
