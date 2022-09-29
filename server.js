// all server side logic will go here until I decide to break it up
const fastify = require('fastify')({ logger: true })
const path = require('path')

// it about to get ugly, starting to add J5 logic here
// const { Board, Sensor, Led } = require('johnny-five')

// const board = new Board()

// board.on('ready', () => {
//   const digitalSensor = new Sensor({
//     "pin": 9,
//     "type": 'digital'
//   })

//   const time = Date.now()
//   const led = new Led(13);
//   const revolutions = 0

//   digitalSensor.on('change', value => {
//     if (value === 0) {
//       led.on()
//       revolutions += 1
//     } else {
//       led.off()
//     }
//   })

//   // loop every second, during that second, collect all revolutions and multiply by 60
//   setInterval(() => {
//     let elapsed = Date.now() - time
//     console.log("Time Elapsed(ms) : ", elapsed)
//     console.log("RPM : ", revolutions * 60) // problem: push this into a socket
//     console.log("-----------------")
//     revolutions = 0
//   }, 1000);

// })

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
    // note: count resets on each connection
    // let count = 0

    setInterval(() => {
      const randomInterval = () => {
        return (Math.floor(Math.random() * (200 - 25 + 1)) + 25)/100
      }
      connection.socket.send(`${randomInterval()}`)
    }, 3000)

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