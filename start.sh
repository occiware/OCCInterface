#!/bin/sh

# Workaround for Docker Studio since it doesn't support the --add-host parameter yet :
# Add martserver-linkeddata container IP to /etc/hosts file
echo 172.17.0.7 martserver-linkeddata-1 >> /etc/hosts

# Start the MartServer
npm run dev
