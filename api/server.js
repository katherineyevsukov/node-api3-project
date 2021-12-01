const express = require('express');

const server = express();

server.use(express.json())

const usersRouter = require('./users/users-router')

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
