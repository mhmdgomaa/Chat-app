var socket =io() ;
socket.on('connect' ,function (){
  console.log('connected to server');

})


  socket.on('disconnect', function () {
    console.log('the server disconnect');})

  socket.on('newMessage',function (message) {
      console.log('newMessage', message);})
