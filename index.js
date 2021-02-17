const http = require('http');
const express = require('express');
const SocketIo = require('socket.io');

const app = express();
app.use(express.static(__dirname));

const server = http.createServer(app);
const io = SocketIo(server);

let globalId = 0;
io.on('connection', socket => {
    const id = ++globalId;
    const log = (...args) => console.log(`[Connection #${id}]`, ...args);

    log(`Open`);

    socket.on('message', message => {
        log(message);
        socket.send(`${message} - OK`);
    });
    socket.on('error', error => log('ERROR', error));
    socket.on('disconnect', (reason) => log('Closed: ' + reason));
});

const port = 8081;
server.listen(port, () => {
    console.log(`Server started, open http://localhost:${port}`);
})
