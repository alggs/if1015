const net = require('net');
const readLine = require("readline");

const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

const handdleConnection = socket => {

    socket.on('data', (data) => {
        const str = data.toString();
        console.log(blueCollor + 'client:' + resetCollor + str);
    });

    rl.addListener('line', line => {
        socket.write(line);
    })
    
    socket.on('error', (e) => {
        socket.end()
    });
}

const server = net.createServer(handdleConnection)

server.listen(4000, '127.0.0.1', () => {
    console.log("SERVIDOR ONLINE");
});