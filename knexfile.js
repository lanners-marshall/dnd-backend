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
    connection: {
      database: 'my_db',
      user: process.env.USER,
      password: process.env.PASSWORD,
      DATABASE_URL: process.env.DATABASE_URL,
    }
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};