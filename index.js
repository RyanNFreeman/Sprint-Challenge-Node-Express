// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
require('dotenv').config()

const server = require('./server')
const port = process.env.PORT || 4000
const name = process.env.NAME 


server.listen(port, () => {
    console.log(`Hello ${name}, your server is listening on port **${port}**`)
})
