const express = require('express');
const { logger } = require('./middleware/middleware');

const server = express();

server.use(express.json())

const usersRouter = require('./users/users-router')

//MOVED TO MIDDLEWARE FILE, leaving for reference

// server.use((req, res, next) => {
//   console.log({
//     method: req.method,
//     url: req.url,
//     time: new Date().toISOString()
//   })
//   next()
// })

server.use(logger)

server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({message: `${req.method} ${req.baseUrl} not found!`})
})

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'PROD'? 'sorry, there was an error' : err.message,
  })
})

module.exports = server;
