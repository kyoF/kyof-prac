# from selenium import webdriver
# from time import sleep

# # Chromeを起動する
# browser = webdriver.Chrome()

# # urlを指定して、表示する
# url = 'https://scraping-for-beginner.herokuapp.com/login_page'
# browser.get(url)

# # usernameのidを指定して、send_keysで値を入力する
# elem_username = browser.find_element_by_id("username") 
# elem_username.send_keys("imanishi")

# # passwordのidを指定して、send_keysで値を入力する
# elem_username = browser.find_element_by_id("password") 
# elem_username.send_keys("kohei")

# # loginボタンのidを指定して、クリックする
# elem_login_btn = browser.find_element_by_id("login-btn")
# elem_login_btn.click()

# # 一つ一つの要素を指定する方法
# # 名前のidを指定して、textで値を取得する
# elem_name = browser.find_element_by_id("name")
# name = elem_name.text

# # 会社名のidを指定して、textで値を取得する
# elem_company = browser.find_element_by_id("company")
# company = elem_company.text

# # 誕生日のidを指定して、textで値を取得する
# elem_birthday = browser.find_element_by_id("birthday")
# birthday = elem_birthday.text

# # 出身地のidを指定して、textで値を取得する
# elem_come_from = browser.find_element_by_id("come_from")
# come_from = elem_come_from.text

# # 趣味のidを指定して、textで値を取得する
# elem_hobby = browser.find_element_by_id("hobby")
# hobby = elem_hobby.text
# hobby = hobby.replace("\n", ",")


# # thタグのついた要素を取得
# elems_th = browser.find_elements_by_tag_name("th")
# keys = []
# for elem_th in elems_th:
#     key = elem_th.text
#     keys.append(key)

# # tdタグの着いた要素を取得
# elems_td = browser.find_elements_by_tag_name("td")
# values = []
# for elem_td in elems_td:
#     value = elem_td.text
#     values.append(value)

# # csvに出力
# import pandas as pd
# df = pd.DataFrame()
# df["項目"] = keys
# df["値"] = values
# df.to_csv("講師情報")

# Chromeを閉じる
# browser.quit()


# ↓画面表示せずにChromeを立ち上げる
# from selenium.webdriver.Chrome.options import Options

# options = Options()

# options.add_argument("--headless")

# browser = webdriver.Chrome(options=options)
# url = "https://scraping-for-beginner.herokuapp.com/login_page"
# browser.get(url)
# browser.quit()


# import requests
# from bs4 import BeautifulSoup

# url = "https://scraping-for-beginner.herokuapp.com/udemy"
# res = requests.get(url)
# soup = BeautifulSoup(res.text, 'html.parser')
# # print(soup.find_all("p"))
# # print(soup.find("p"))
# # print(soup.p)
# # print(soup.p.text)
# subscribers = soup.find_all("p", attrs={"class":"subscribers"})[0]
# print(int(subscribers.text.split('：')[1]))

# reviews = soup.find_all("p", attrs={"class":"reviews"})[0]
# print(int(reviews.text.split("：")[1]))

# print(soup.select_one(".subscribers").text)
# print(soup.select_one(".reviews").text)
