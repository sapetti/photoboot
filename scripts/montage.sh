#!/bin/bash
mogrify -resize 968x648 $1 $2 $3 $4
montage $1 $2 $3 $4 -tile 2x2 -geometry +10+10 $5.jpg
lp -d Canon_CP900 $5