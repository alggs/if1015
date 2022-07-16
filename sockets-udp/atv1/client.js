const dgram = require('dgram');
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

redCollor = '\u001b[31m';
resetCollor = '\u001b[0m';

const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(redCollor + `Server: ` + resetCollor + `${msg}`);
})

socket.on('listening', () => {
    const address = socket.address();
    console.log(`client listening ${address.address}:${address.port}`);
});

socket.bind(4001);

rl.addListener('line', message => {
    socket.send(message, 4000, 'localhost');
})
