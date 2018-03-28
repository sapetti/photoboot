https://github.com/drerik/portable_photobooth

# Installation

## Install required packages

sudo aptitude install libgphoto2-2 curl git libgphoto2-2-dev libjpeg-dev cups python-cups

## Install and configure cups

* Enable web interface
  sudo cupsctl WebInterface=yes
* Create a ssh tunnel to the pi to forward the cups web admin
  $ ssh -L 8631:localhost:631 pi@10.0.0.67
* Go to http://127.0.0.1:8631 and add the printer. My Canon Selphy CP900 works with the CP770 driver.
