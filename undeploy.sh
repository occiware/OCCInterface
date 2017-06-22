#!/bin/sh

# Uninstall unnecessary software
apt-get purge -y build-essential libssl-dev curl \
   && apt-get autoremove -y
   && npm uninstall

