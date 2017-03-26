const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const {Users} = require('./utils/users');

const { generateMessage , generatelocationMessage} = require('./utils/message')
const {isRealString}=require('./utils/validation')
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname , '../public')
var users = new Users();


var app = express();
var server = http.createServer(app)
var io=socketIO(server)

io.on('connection', (socket)=>{
  console.log('New user is connected');


  socket.on('join', (par , callback) => {
  if (!isRealString(par.name)) {
  callback('Name is required.')
  }

  users.removeUser(socket.id);
  users.addUser(socket.id, par.name);

  io.emit('updateUserList',users.getUserList(par.room));

  socket.emit('newMessage',
      generateMessage('Admin' , 'Welcome to the chat room')
  );

  socket.broadcast.emit('newMessage',
      generateMessage('Admin' ,  `${par.name} has joined`)
  );

});


  socket.on('creatMessage', function (message , callback) {
    console.log('creatMessage', message );
    var user = users.getUser(socket.id)

    io.emit('newMessage',generateMessage(user.name , message.text)
     );
     callback( 'from the server' );

  });

  socket.on('creatlocationMessage',function (coords) {
    var user = users.getUser(socket.id)

  io.emit('newlocationMessage',generatelocationMessage(user.name ,coords.latitude , coords.longitude ) )
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.emit('updateUserList', users.getUserList(user.room));
      io.emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

app.use(express.static(publicPath));

server.listen(port , ()=> {
  console.log(`the user port is ${port}`);
})
