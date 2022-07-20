const dgram = require('dgram');
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });
const socket = dgram.createSocket('udp4');

socket.on('message', (msg, rinfo) => {
    console.log(transformBinaryInString(msg));
})

socket.on('listening', () => {
    const address = socket.address();
    console.log(`CLIENT ONLINE ${address.address}:${address.port}`);
});

socket.bind(4001);

rl.addListener('line', message => {
    socket.send(transformStringInBinary(message), 4000, 'localhost');
})


//Marshaller data
const transformStringInBinary =  message => {
    return Buffer.from(message);
}

//UnMarshaller data
const transformBinaryInString = data => {
    return data.toString('utf8');
}
