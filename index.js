// routing
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
http.listen(5000 || process.env.PORT, function(){
    console.log('listening on *:' + process.env.PORT);
});

// arrays to store maps
let maps = {};

// routing middleware
app.get('/map/:id', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public/'));

// api endpoints
app.get('/api/getmap', function(req, res) {
  res.send(maps[req.params.id] || null);
});
app.get('/api/getid', function(req, res) {
  let id;
  do {
    id = Math.floor(Math.random() * 1e6);
    maps[id] = [];
  } while(maps[id]);
  res.send("" + id);
});
app.get('/api/datapoint', function(req, res) {
  const id = req.query.id;
  const time = req.query.time;
  const acceleration = req.query.acceleration;
  if(!id || !time || !acceleration || !maps[id]) {
    res.send(null);
    return;
  }
  maps[id].push({
    id: id,
    time: time,
    acceleration: acceleration
  });
  return true;
});

// socket.io stuff
io.on('connection', function(socket) {
  console.log('new connection');
  socket.emit('message');
});
