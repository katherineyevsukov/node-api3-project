// require your server and launch it
const server = require('./api/server')

server.listen(9000, () => {
    console.log('server running on http://localhost:9000')
})
