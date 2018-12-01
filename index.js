const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/map/:id', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public/'));

io.on('connection', function(socket) {
  
  console.log('new connection');

  socket.emit('message');

});

http.listen(5000 || process.env.PORT, function(){
    console.log('listening on *:' + process.env.PORT);
});
