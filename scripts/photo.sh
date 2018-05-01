#Archive photo
mv $PHOTO_FOLDER/$1 $ARCHIVED_FOLDER
cd $ARCHIVED_FOLDER

#Upload to dropbox
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $1

#Print image
lp -d Canon_CP9600 $1

