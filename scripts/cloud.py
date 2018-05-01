#!/usr/bin/env python
import dropbox
import sys
import os

def upload_to_dropbox(path, fname):
        uploaded = False
        count = 0
        while(uploaded == False and count < 3):
                try:
                        print 'Uploading ' + fname + ' Try ' + str(count)
                        client = dropbox.Dropbox(os.environ['DROPBOX_TOKEN'])
			#print dir(client)
			print path+fname
                        f = open(path+fname)
                        response = client.files_upload(f.read(), '/'+fname, mute=True)
                        #print response
                        if(response):
                                uploaded = True
                except Exception as e:
                        print "Error in upload_to_dropbox:: " + str(e)
                count+=1
        if uploaded == False:
                f = open('/home/pi/failed.txt','a')
                f.write(fname+'\n') # python will convert \n to os.linesep
                f.close() # you can omit in most cases as the destructor will call it
        print "End Dropbox upload"

print "-----------------------------------"
upload_to_dropbox(sys.argv[1], sys.argv[2])

