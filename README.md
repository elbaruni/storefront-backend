# Build A Storefront Backend

TypeScript Nodejs Backend to exposse a RESful api for frontend developers.  

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions 
 `npm install`

## Database SetUp

### Create Databases 

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER front_store_user WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE front_store_db;`
    - `CREATE DATABASE front_store_db_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c front_store_db`
        - `GRANT ALL PRIVILEGES ON DATABASE front_store_db TO front_store_user;`
    - Grant for test database
        - `\c front_store_db_test`
        - `GRANT ALL PRIVILEGES ON DATABASE front_store_db_test TO front_store_user;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`db-migrate up`

 
### Databse port
database on port `5432`
## Enviromental Variables Set up
rename `.env.sample` file to `.env` and  set your setup values

## Start App
`npm run watch`

`starting app on: 0.0.0.0:3000`

### App Port  
App on port `3000` 
## Endpoint Access
APIs endpoints can be found here [REQUIREMENT.md](REQUIREMENTS.md) 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 



## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github.  
provided `.env.sample` 


 