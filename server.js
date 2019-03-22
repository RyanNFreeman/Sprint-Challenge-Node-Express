const express = require('express')
const server = express()

const projectsRouter = require('./routes/projects-router')
const actionsRouter = require('./routes/actions-router')

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req, res) => {
    res.status(200).send('here\'s your sanity check!')
})

module.exports = server;