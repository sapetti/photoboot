#Archive photo
mv $PHOTO_FOLDER/$1 $ARCHIVED_FOLDER

#Upload to dropbox
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $1

