// all server side logic will go here until I decide to break it up
const fastify = require('fastify')({ logger: true })
const path = require('path')

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

fastify.register(require('@fastify/websocket'))

fastify.get('/', async (request, reply) => {
  await reply.sendFile('index.html')
})

fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, request) => {
    console.log('Client connected')

    connection.socket.on('message', message => {
      console.log(`Client message: ${message}`)
      connection.socket.send('praise cage! from server')
    })
    connection.socket.on('close', () => {
      console.log('Client disconnected');
    });
  })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()