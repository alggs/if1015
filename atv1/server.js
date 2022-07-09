const net = require('net');
const readLine = require("readline");

const map = new Map();
map.set('a', 1);

const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

const handdleConnection = socket => {
    socket.write("Send your name...")
    console.log('Esta conexão está na porta: ' + socket.remotePort); //Usar pra mapear quem é quem

    socket.on('data', (data) => {
        const str = data.toString();
        if (str === 'end') {
            socket.end();
        }
        console.log('client:' + str);
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