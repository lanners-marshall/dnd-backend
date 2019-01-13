const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const userRoutes = require('./Routes/usersRoutes')
const sessionsRoutes = require('./Routes/sessionsRoutes')
const encountersRoutes = require('./Routes/encountersRoutes')

server.use('/users', userRoutes)
server.use('/sessions', sessionsRoutes)
server.use('/encounters', encountersRoutes)

if (process.env.NODE_ENV !== 'test') {
  server.listen(5555, () => console.log('running on port 5555'));
}

module.exports = server;