# Sit and Spin Record Player

## Sit and spin to play music.

## Build notes:
- more detailed ramblings on my clog: https://pchinjr.notion.site/Sit-and-Spin-Music-Player-608515a14d024621a766745f13a7702a
- get sensor and make it work with johnny-five
- set up a fastify server
  - set up serving static assets
    - front end is static html implementing browser native websocket client
  - set up websocket server
- integrate johnny-five into fastify socket server
  - implement action router on message event

## Tech Stack
- nodejs
- johnny-five.io
- fastify
  - @fastify/static
  - @fastify/websocket
- Arduino Uno
- 49E Hall Sensor LM393 Linear Hall Effect Sensitivity Detection Module (Hall Sensor and Jumper Wire) by MUZHI