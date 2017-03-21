var socket =io() ;
socket.on('connect' ,function (){
  console.log('connected to server');

})


  socket.on('disconnect', function () {
    console.log('the server disconnect');})

  socket.on('newMessage',function (message) {

        var time= moment(message.createdAt).format('h:mm a')
         var template = jQuery('#message-template').html();
         var html= Mustache.render(template, {
           text: message.text,
           from: message.from,
           createdAt : time
         })
      jQuery('#messages').append(html);
    })

  socket.on('newlocationMessage', function (message) {
    var time= moment(message.createdAt).format('h:mm a')
    var template = jQuery('#location-message-template').html();
    var html= Mustache.render(template, {
      from: message.from ,
      url: message.url ,
      createdAt: time
    });
    jQuery('#messages').append(html);
    // var li =jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>')
    // li.text(`${message.from} ${time}:`)
    // a.attr('href', message.url )
    // li.append(a);
    // jQuery('#messages').append(li);

  })

jQuery('#Ahly-message').on('submit', (e)=>{
  e.preventDefault();

  socket.emit('creatMessage' , {
      from : 'User' ,
    text : jQuery('[name=Message]').val()
  }, ()=> {
    jQuery('[name=Message]').val('') })
})

  var loc = jQuery('#location');

      loc.on('click' , function () {
    if (!navigator.geolocation) {
      return alert(' your broweser doesnt support Geolocation ' ) };

      loc.attr('disabled' , 'disabled' )

      navigator.geolocation.getCurrentPosition( function (position) {
          // console.log(position);
          loc.removeAttr('disabled' , 'disabled' )

          socket.emit('creatlocationMessage', { latitude : position.coords.latitude , longitude: position.coords.longitude  })

      }, function () {          loc.removeAttr('disabled' , 'disabled' ).text('send location ')

        alert('cant get your location');  })

  })