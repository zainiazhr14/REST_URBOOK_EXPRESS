# BASE REST API
This project was generated using [Express JS](https://expressjs.com/).
## Getting Started
### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](nodejs.org) Node ^14.xx
- [Npm](https://npmjs.com)
- [VSC - Visual Studio Code](https://code.visualstudio.com/download)
- Turn Off Prettier Plugin / Format On Save setting on VSC
- Enabled Eslint Plugin


Install dependencies
```javascript
cd REST_API_TYPESCRIPT_EXPRESS
npm install
```

## RUNNING API
Running API (Make sure MongoDB and PostgreSQL is running)

[.env.example](.env.local.example)
### LOCAL (In Your Local Computer)
```javascript
// Create .env.local if on local computer

// on local
npm run local

```

### Development (In Your Development mode)
```javascript
// Create .env.development if on development mode

// on local
npm run development

```

### DOCKER COMPOSE(Run With Docker COMPOSE)
```javascript
docker-compose up
```


API documentation on
```javascript
http://localhost:3001/documentation
```

Available process.env
```javascript
APP_PORT=3001 //starting port
NODE_MICRO=0 //running micro
```