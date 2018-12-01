const socket = io();

socket.on('message', function() {
  console.log('testing');
});
