# pydrive2 is an actively maintained fork
# https://console.cloud.google.com
from pydrive2.drive import GoogleDrive
from pydrive2.auth import GoogleAuth, ServiceAccountCredentials

gauth = GoogleAuth()
scope = ['https://www.googleapis.com/auth/drive.file']
gauth.credentials = ServiceAccountCredentials.from_json_keyfile_name('credentials.json', scope)
drive = GoogleDrive(gauth)
file4 = drive.CreateFile({'title':'test/appdata.json', 'mimeType':'application/json'})
file4.SetContentString('{"firstname": "John", "lastname": "Smith"}')
file4.Upload()  # Upload file.
file4.InsertPermission({'type': 'anyone',
                        'value': 'anyone',
                        'role': 'reader'})
print(file4['permissions'])
for file_list in drive.ListFile({'maxResults': 10}):
    print('Received {} files from Files.list()'.format(len(file_list))) # <= 10
    for file1 in file_list:
        print('title: {}, id: {}, mime: {}'.format(file1['title'], file1['id'], file1['mimeType']))

# file1 = drive.CreateFile({'title': 'Hello.txt'})
# file1.SetContentString('Hello')
# file1.Upload() # Files.insert()
# file1.InsertPermission({'type': 'anyone',
#                         'value': 'anyone',
#                         'role': 'reader'})

# file1['title'] = 'HellowWorld.txt'  # Change title of the file
# file1.Upload()  # Files.patch()

# content = file1.GetContentString()  # 'Hello'
# file1.SetContentString(content+' World!')  # 'Hello World!'
# file1.Upload() # Files.update()

# filefoo = drive.CreateFile({'id': file4['id']})
# print(filefoo.GetContentString())
# file2 = drive.CreateFile()
# file2.SetContentFile('hello.png')
# file2.Upload()
# print('Created file %s with mimeType %s' % (file2['title'],
# file2['mimeType']))
# # Created file hello.png with mimeType image/png

# file3 = drive.CreateFile({'id': file2['id']})
# print('Downloading file %s from Google Drive' % file3['title']) # 'hello.png'
# file3.GetContentFile('world.png')  # Save Drive file as a local fil
