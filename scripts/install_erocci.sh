#we remove uneeded dependencies
sed -i '/express/d' package.json

#we set integratedVersion to true
sed -i -e 's/integratedVersion = false/integratedVersion = true/g' ./conf.js

npm install --production
npm run build
