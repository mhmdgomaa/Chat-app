const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000 ;
const publicPath = path.join(__dirname , '../public')


var app = express();
var server = http.createServer(app)
var io=socketIO(server)

app.use(express.static(publicPath));

server.listen(port);
