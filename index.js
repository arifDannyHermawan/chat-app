const express = require('express');
const socket  = require('socket.io');

// app setup
const app = express();
const server = app.listen(4000, () => {
  console.log('listening request on port 4000');
});

// static file
app.use(express.static('public'));


// socket setup
let io = socket(server);

io.on('connection', (socket) => {
  console.log('buat koneksi socket', socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
