const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');

const { generateMessage } = require('./utils/message')

const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname , '../public')


var app = express();
var server = http.createServer(app)
var io=socketIO(server)

io.on('connection', (socket)=>{
  console.log('New user is connected');

  socket.emit('newMessage',
      generateMessage('Admin' , 'Welcome to the chat room')
);

  socket.broadcast.emit('newMessage',
      generateMessage('Admin' , 'new user has joined')
);

  socket.on('creatMessage', function (message , callback) {
    console.log('creatMessage', message );
    io.emit('newMessage',generateMessage(message.from , message.text)
     );
     callback( 'from the server' );
  });

  socket.on('disconnect', ()=>{
    console.log('the user disconnected');
  });
});


app.use(express.static(publicPath));

server.listen(port , ()=> {
  console.log(`the user port is ${port}`);
})
