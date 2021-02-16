const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.static('.'));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

let globalId = 0;
wss.on('connection', ws => {
    const id = ++globalId;
    const log = (...args) => console.log(`[Connection #${id}]`, ...args);

    log(`Open`);

    ws.on('message', message => {
        log(message);
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(`${message} - OK`);
        }
    });
    ws.on('error', error => log('ERROR', error));
    ws.on('close', () => log('Closed'));
});

server.listen(8080, () => {
    console.log('Server started, open http://localhost:8080');
})
