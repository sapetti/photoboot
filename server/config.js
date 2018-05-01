module.exports = {
  archiveFolder: '/home/pi/archived',
  photoFolder: '/home/pi/photos',
  accessToken: process.env.DROPBOX_TOKEN || 'YOUR_TOKEN_HERE',
  printer: 'Canon_SELPHY_CP1200',
  cloud_sh: __dirname + '/script/photo.sh',
  print_sh: __dirname + '/script/photo_n_print.sh',
  montage_sh: __dirname + '/script/photo_n_montage.sh',
  photoScript: __dirname + '/../scripts/photo.sh',
  printScript: __dirname + '/../scripts/photo_n_print.sh',
  montageScript: __dirname + '/../scripts/photo_n_montage.sh'
}
