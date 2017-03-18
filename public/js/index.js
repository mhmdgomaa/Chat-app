var socket =io() ;
socket.on('connect' ,function (){
  console.log('connected to server');

  socket.emit('creatMessage', {
    from : 'abo omar ',
    body: 'haf4akhko'
  });
})


  socket.on('disconnected', function (socket){
    console.log('the server disconnect');})

  socket.on('newMessage',function (email) {
      console.log('newMessage', email);})
