import requests
from bs4 import BeautifulSoup

# article_title = []
# article_link = []
# article_datetime = []
# article_image_link = []

# '''Ledge.ai'''
# url = 'https://ledge.ai/theme/news/'
# res = requests.get(url)
# soup = BeautifulSoup(res.text, 'html.parser')
# url_title = soup.find('title').text
# articles = soup.select("[class='grid-item']")
# for article in articles:
#     article_title.append(article.find('h2').text.replace(' ',''))
#     article_link.append(article.find('a').get('href'))
#     article_datetime.append(article.find('time').text)
#     article_image_link.append(article.find('img').get('src'))

'''MSN news'''
url = 'https://www.msn.com/ja-jp/news'
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')
url_title = soup.find('title').text
article = soup.find_all('li', attrs={'class':'rc rcp'})
with open('file.txt', 'w') as url_file:
    url_file.write(str(soup))
