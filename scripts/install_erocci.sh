#!/bin/sh

set -e

topdir=$(cd $(dirname $0)/.. && pwd)

#we remove uneeded dependencies
sed -i '/express/d' ${topdir}/package.json

#we set integratedVersion to true
sed -i -e 's/integratedVersion = false/integratedVersion = true/g' ${topdir}/conf.js

cd ${topdir} && \
    npm install --production && \
    npm run build
