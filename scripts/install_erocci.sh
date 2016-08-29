sed -i '/express/d' package.json

npm install --production
npm run build
