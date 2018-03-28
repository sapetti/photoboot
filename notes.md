## TODOS:

* Google how to disable the LCD from going to sleep on your rpi. https://raspberrypi.stackexchange.com/questions/752/how-do-i-prevent-the-screen-from-going-blank http://www.pygame.org/docs/ref/mouse.html#pygame.mouse.set_visible
* Photo preview? Print? Too slow?
* Video lag rpi3 or other cam?
* Run script node
* Print photo
* Print queue
* Browser on fullscreen on startup: chromium-browser --app=http://localhost:3000 --start-fullscreen
* Take filename from command line in shell (see script-tips.txt)
* Sync photo and countdown

## Printer

* Plug in the printer with USB connection
* Setup your CUPs config file by enabling port 631
* Add the printer by going to yourrpihostname:631 on your browser
* Use the following driver file: Canon SELPHY CP900 - CUPS+Gutenprint v5.2.10
* Verify with test page print.

## Linux Install Packages

* sudo aptitude install libgphoto2-2 libgphoto2-2-dev libjpeg-dev cups
* Not needed curl git python-cups
* Enable web interface: sudo cupsctl WebInterface=yes
* Create a ssh tunnel to the pi to forward the cups web admin?? ssh -L 8631:localhost:631 pi@10.0.0.67
* Go to http://127.0.0.1:8631 and add the printer

## Testing

* Photo
* Print
* Print queue
* Delays
* Photo then User choose print or skip?

## Take photo

```
#!/bin/bash
mogrify -resize 968x648 /photo_path/photo1.jpg
montage /photo_path/photo1.jpg -tile 2x2 -geometry +10+10 /montage_path/montage1.jpg
montage /montage_path/montage1.jpg /montage_path/photoboot_label.jpg -tile 2x1 -geometry +5+5 /montage_path/temp_montage3.jpg
lp -d Canon_CP900 /montage_path/temp_montage3.jpg
#... backup image ... remove
```
