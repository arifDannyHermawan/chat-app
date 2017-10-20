// buat koneksi
let socket = io.connect('http://localhost:4000');

// query dom
let message  = document.getElementById('message');
let handle   = document.getElementById('handle');
let btn      = document.getElementById('send');
let output   = document.getElementById('output');
let feedback = document.getElementById('feedback');

// emit event
btn.addEventListener('click', () => {
  socket.emit('chat', {
    handle: handle.value,
    message: message.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// listen events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ' : </strong>' + data.message + '</p>' ;
});

socket.on('typing', (data) => {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>' ;
});
