const dgram = require('dgram');
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(blueCollor + `Client: ` + resetCollor + `${msg}`);
})

socket.on('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(4000);

rl.addListener('line', message => {
    socket.send(message, 4001, 'localhost');
})