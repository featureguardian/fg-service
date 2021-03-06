# fg-service

[![Build Status](https://travis-ci.org/featureguardian/fg-service.svg?branch=develop)](https://travis-ci.org/featureguardian/fg-service)
[![Test Coverage](https://img.shields.io/codecov/c/github/featureguardian/fg-service.svg)](https://codecov.io/github/featureguardian/fg-service)

Feature Guardian provides a Restful API that serves up user entitlements to your application.

## Setup your environment
1. Version 4.2.3 of Node.js
1. Install [git flow](https://github.com/nvie/gitflow/wiki/Installation) for [Windows](https://github.com/nvie/gitflow/wiki/Windows#git-for-windows-previously-msysgit), read more about git flow [here](https://github.com/nvie/gitflow)
1. Install [mongodb](https://docs.mongodb.org/v3.0/installation/)
1. In mongodb shell, run the following commands:
	* use featureguardian
	* db.application.insert({name: 'TestApplication1'})
	* make note of application._id with command: db.application.find()
1. If using Windows update npm to 3.5 or greater
    * cd \program files\nodejs
    * ​npm -g install npm@3.5.0
1. If using Windows
    * install [Python 2.7](https://www.python.org/downloads/)
    * install [node-gyp](https://github.com/nodejs/node-gyp#installation)

## Setup the application

Run locally:

1. clone this repo: `git clone -b develop https://github.com/featureguardian/fgservice.git`
2. Setup the repo to recognize git-flow commands: `git flow init -d`
1. Globally install sails: `npm install -g sails`
1. Globally install the mocha test runner: `npm install -g mocha`
1. Install all modules for the app: `npm install`
1. Start the App: `sails lift`
1. Obtain a token at the following url:
	* http://localhost:1337/token?appId=**app_id_from_above_instructions**
	* send this token with every request ( in authorization header ) ex. Authorization: Bearer **your_auth_token**
	 * [Postman](https://www.getpostman.com/) makes this easy
	 * example: [GET] http://localhost:1337/application


## Swagger doc

Available at: [http://localhost:1337/swagger/doc](http://localhost:1337/swagger/doc)  ( no authToken required )

## Things to make life more awesome

### TypeScript Definitions
1. Install TSD: `npm install -g tsd`
1. Install the definitiosn for the project: `tsd install`

### Integration Tests
Run them like this: `mocha integration-test/bootstrap.test.js integration-test/*.test.js`
