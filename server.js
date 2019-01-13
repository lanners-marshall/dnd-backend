const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

const dbConfig = require('./knexfile')

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

let app = server.listen(process.env.PORT || 5555, function () {
  let port = app.address().port;
  console.log("Express is working on port " + port);
});

module.exports = server;