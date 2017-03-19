var socket =io() ;
socket.on('connect' ,function (){
  console.log('connected to server');

})


  socket.on('disconnect', function () {
    console.log('the server disconnect');})

  socket.on('newMessage',function (message) {
      console.log('newMessage', message);
      var li = jQuery('<li></li>');
      li.text(`${message.from}:  ${message.text} .`);
      jQuery('#messages').append(li);
    })

    // socket.emit('creatMessage', {
    //   from : 'om omar',
    //   text : 'hafshakhk'
    // } , (data) => { console.log('Got it ' , data);})

jQuery('#Ahly-message').on('submit', (e)=>{
  e.preventDefault();

  socket.emit('creatMessage' , {
      from : 'User' ,
    text : jQuery('[name=Massage]').val()
  }, ()=> {})
})
