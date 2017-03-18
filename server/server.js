const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname , '../public')


var app = express();
var server = http.createServer(app)
var io=socketIO(server)

io.on('connection', (socket)=>{
  console.log('New user is connected');



  socket.on('creatMessage', function (message) {
    console.log('creatMessage', message );
    io.emit('newMessage',{
      text: message.text ,
      from: message.from
      createdAt : new Date().getTime()
    } );
  });

  socket.on('disconnect', ()=>{
    console.log('the user disconnected');
  });
});


app.use(express.static(publicPath));

server.listen(port , ()=> {
  console.log(`the user port is ${port}`);
})
