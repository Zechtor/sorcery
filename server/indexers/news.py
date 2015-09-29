import requests, md5
from base64 import b64encode
from lxml import html

from models.article import Article

class NewsIndexer():

    # base method, entry point for the indexer
    def index(self):
        print '\nIndexing: Bing Articles\n'

        newsData = self.search()
        self.process(newsData)

    def getArticles(self, page):
        # search parameters
        pageSize = 15
        skip = pageSize * (page - 1)

        # create credential for authentication
        accountKey= 'VVex3zUPUy8nPJXTH66ZrTbebM36TANIPYMPGhxkD9U'
        encodedCredentials = (':%s' % accountKey).encode('base64')[:-1]

        # query
        url = 'https://api.datamarket.azure.com/Bing/Search/News?Query=\'\"Orlando+Magic\"\'&$skip=' + str(skip) + '&$format=json&NewsSortBy=\'Date\''
        headers = {
            'Authorization': 'Basic ' + encodedCredentials
        }

        response = requests.get(url, headers=headers)
        results = response.json()

        return results['d']['results']

    def search(self):
        lastIndexed = None    
        if Article.getMostRecent(1):
            lastIndexed = Article.getMostRecent(1).articleId

        articleData = []

        # pagination
        currentPage = 1
        maxPage = 1
        while currentPage <= maxPage:
            data = self.getArticles(currentPage)
            articleData += data

            # there is a known bug when bing has duplicate entires
            # a false positive causes us to terminate the search early

            # determine if we have hit the last article in our index
            # this is the point where we will begin to get duplicates
            hasMatch = False
            for d in data:
                if lastIndexed == md5.new(d['Url']).hexdigest():
                    hasMatch = True
                    break

            if hasMatch:
                break

            currentPage += 1

        return articleData

    def process(self, articleList):
        articleCount = len(articleList)
        successCount = 0
        errorCount = 0
        for data in articleList:
            # attempt to extract an image
            data['ImageUrl'] = self.extractImage(data['Url'])

            result = Article.save(Article(data))
            if result == True:
                successCount += 1
            else: 
                errorCount += 1

        print 'Process results:\n  Article Count %d\n  Success Count %d \n  Error Count %d' % (articleCount, successCount, errorCount)

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
