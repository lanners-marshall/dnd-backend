require('custom-env').env('staging')
const DATABASE_URL = process.env.DB_USER


// console.log(process.env.APP_ENV)
// console.log(process.env.APP_NAME)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)
// console.log(process.env.NODE_ENV)
// console.log(process.env.PORT)


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dnd.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};