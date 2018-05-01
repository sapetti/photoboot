#!/bin/bash
# $1: Photo filename #1

#Archive photos
mv $PHOTO_FOLDER/$1 $ARCHIVE_FOLDER

cd $ARCHIVE_FOLDER

#Print image
lp -d Canon_CP900 $1

#Upload it to dropbox
node ../server/cloud.js $1