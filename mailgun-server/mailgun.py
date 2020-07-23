# practice the python mailgun API, since it seems we'll be able to swing
# a python server via heroku
# pip install requests python-dotenv
import requests
import os
from dotenv import load_dotenv

load_dotenv(verbose=True)
DOMAIN = os.getenv('MAILGUN_DOMAIN')
URL = os.getenv('MAILGUN_URL')
print(DOMAIN)
print(URL)
v = requests.post(f'{URL}/messages',
                  auth=('api', os.getenv('MAILGUN_API_KEY')),
                  data={'from': f"Alex 'Mailgun' Forrence <mailgun@{DOMAIN}>",
                        'to': ['aforrence@gmail.com', 'actlab@yale.edu'],
                        'subject': 'This is for [prolific]',
                        'text': 'not sure how to get proper tags, but this will allow sorting.',
                        'o:tag': ['mailgun', 'prolific']},
                  #files=[('attachment', ('test-data.zip', open('test-data.zip', 'rb').read()))],
                  )
print(v)
