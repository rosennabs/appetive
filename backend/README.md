# APPETIVE 

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U labber` command to login to the PostgreSQL server with the username `labber` and the password `labber`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment. M1/M2 and WSL2 users can execute this command in their terminal.

Create a database with the command `CREATE DATABASE appetive;`.

Create a new `.env` file and copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=appetive
DB_PORT=5432
```

## Generating UUIDs in PostgreSQL
To use `uuid_generate_v4()` in your PostgreSQL database, make sure the `uuid-ossp` extension is installed and enabled. You can install it by running the following SQL command:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Seeding

To reset the database and seed it with initial data, run the following command:
``` 
npm run db:reset
```


Run a the development server with `npm start` in the Host environment. 

- Use the browser to navigate to `http://localhost:8080`.

## Run The Server

Running the server normally
```sh
npm start
```

## Using nodemon
```sh
nodemon index.js
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
npm run error
```