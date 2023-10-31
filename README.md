# Guest Note

## Instalation
This App requires [NodeJS](https://nodejs.org/) v14+ and [postgreSQL](https://www.postgresql.org/) Database to run.

### Running on local machine

Make sure you create .env file that contain theese environment variables:
```
SERVER_PORT
DB_PORT
DB_NAME
DB_USER
DB_PASS
DB_HOST
JWT_KEY
```

After setting up all the environment variables, on command prompt, you can execute theese code to run the app
```
npm i
npm run start
```

Before head down to [Movie-Library](localhost:3000/graphiql) to write your query, you must authenticate first in order to access the app, I've provided a dummy data with details below:

`
username = admin
`
`
password = admin
`

## Error/Bug Discoveries
Find some errors or bugs while running the app? You can contribute by telling me what the errors and bugs are, or you could straight up make a pull request on this repository.
