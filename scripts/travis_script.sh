#!/usr/bin/env bash
#setting the variable integrated to false (to be sure)
sed -i -e 's/integratedVersion = true/integratedVersion = false/g' ./conf.js

#we package to deploy to heroku
npm run build
rm .gitignore
mv .gitignoreTravis .gitignore

git config user.name "Travis CI"
git config user.email "github@travis-ci.org"

git add dist/
git commit -am "deploy to heroku"
