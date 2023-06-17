const dotenv = require('dotenv');
const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app)
const {Server} = require('socket.io');
const io = new Server(httpServer)
dotenv.config({
    path: '.env'
});
console.log(process.env.PORT)
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { 
    console.log('a user connected');
    socket.on('chat', (msg) => { 
        io.emit('reply', msg);
    });
});

httpServer.listen(3000, () => { 
    console.log('listening on *:3000');
});