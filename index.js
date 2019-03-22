// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
require('dotenv').config()

const server = require('./server')
const port = process.env.PORT || 4000
const name = process.env.NAME 
const helmet = require('helmet')

server.use(helmet())

server.listen(port, () => {
    console.log(`Hello ${name}, your server is listening on port **${port}**`)
})
