// this is the main logic for the sensor
const { Board, Sensor, Led } = require('johnny-five')

const board = new Board()

board.on('ready', () => {
  const digitalSensor = new Sensor({
    "pin": 9,
    "type": 'digital'
  })

  const time = Date.now()
  const led = new Led(13);
  let revolutions = 0

  digitalSensor.on('change', value => {
    console.log("Digital Sensor: ")
    console.log("value  : ", value)
    console.log("revolutions: ", revolutions)
    console.log("-----------------")
    if (value === 0) {
      led.on()
      revolutions += 1
    } else {
      led.off()
    }
  })

  setInterval(() => {
    let elapsed = Date.now() - time
    console.log("Time Elapsed(ms) : ", elapsed)
    console.log("RPM : ", revolutions * 60)
    console.log("-----------------")
    revolutions = 0
  }, 1000);

})