// this is a test script to see if your arduino is working
const { Board, Led } = require("johnny-five");
const board = new Board();

board.on("ready", () => {

  // Create a standard `led` component instance
  const led = new Led(13);

  // "blink" the led in 500ms
  // on-off phase periods
  led.blink(2000);
});