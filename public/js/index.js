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

  socket.on('newlocationMessage', function (message) {
    var li =jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}:`)
    a.attr('href', message.url )
    li.append(a);
    jQuery('#messages').append(li);

  })

jQuery('#Ahly-message').on('submit', (e)=>{
  e.preventDefault();

  socket.emit('creatMessage' , {
      from : 'User' ,
    text : jQuery('[name=Massage]').val()
  }, ()=> {})
})

  jQuery('#Location').on('click' , function () {
    if (!navigator.geolocation) {
      return alert(' your broweser doesnt support Geolocation ' ) };

      navigator.geolocation.getCurrentPosition( function (position) {
          // console.log(position);
          socket.emit('creatlocationMessage', { latitude : position.coords.latitude , longitude: position.coords.longitude  })

      }, function () {
        alert('cant get your location');  })

  })
