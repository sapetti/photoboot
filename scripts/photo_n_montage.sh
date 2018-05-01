img_ext=".jpg"
collage=${4%$img_ext}"-m.jpg"
echo $collage

mv $PHOTO_FOLDER/$1 $ARCHIVE_FOLDER
mv $PHOTO_FOLDER/$2 $ARCHIVE_FOLDER
mv $PHOTO_FOLDER/$3 $ARCHIVE_FOLDER
mv $PHOTO_FOLDER/$4 $ARCHIVE_FOLDER


cd $ARCHIVED_FOLDER

mogrify -resize 968x648 $1 $2 $3 $4
montage $1 $2 $3 $4 -title 2x2 -geometry +10+10 $collage


python $CLOUD_SCRIPT $ARCHIVED_FOLDER $1
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $2
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $3
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $4
python $CLOUD_SCRIPT $ARCHIVED_FOLDER $collage
