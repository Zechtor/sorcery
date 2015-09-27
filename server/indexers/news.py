import requests, md5
from base64 import b64encode

from models.article import Article

class NewsIndexer():

    def index(self):
        print '\n===== begin news indexing =====\n'

        newsData = self.search()
        self.process(newsData)

        print '===== end news indexing\n ====='

    def getArticles(self, page):
        pageSize = 15
        # search parameters
        skip = pageSize * (page - 1)
        accountKey= 'VVex3zUPUy8nPJXTH66ZrTbebM36TANIPYMPGhxkD9U'
        # userAgent = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; FDM; .NET CLR 2.0.50727; InfoPath.2; .NET CLR 1.1.4322)'
        encodedCredentials = (':%s' % accountKey).encode('base64')[:-1]
        # query
        url = 'https://api.datamarket.azure.com/Bing/Search/News?Query=\'\"Orlando+Magic\"\'&$skip=' + str(skip) + '&$format=json&NewsSortBy=\'Date\''
        # create credential for authentication
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
        maxPage = 5
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
            result = Article.save(Article(data))
            if result == True:
                successCount += 1
            else: 
                errorCount += 1

        print 'Process results: Article Count %d - Success Count %d - Error Count %d' % (articleCount, successCount, errorCount)



