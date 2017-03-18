var socket =io() ;
socket.on('connect' ,function (){
  console.log('connected to server');

})


  socket.on('disconnected', function (){
    console.log('the server disconnect');})

  socket.on('newMessage',function (message) {
      console.log('newMessage', message);})
