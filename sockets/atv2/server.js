const net = require('net');

let map = new Map();
let clients = [];

const handdleConnection = socket => {
    clients.push(socket)
    let firstMessage = true;
    let msg;

    
    const portConnection = socket.remotePort;
    socket.write("Send your name...")
    
    socket.on('data', (data) => {

        msg = data.toString();

        if (firstMessage) {
            setUserName(portConnection, msg)
            firstMessage = false;
            return
        }

        const name = getUserName(portConnection)

        clientsWithoutSending = clients.filter(client => client.remotePort !== portConnection)
        
        clientsWithoutSending.forEach( socket => {
            socket.write(name + ": " + data);
        })
        
    });
    
    socket.on('error', (e) => {
        socket.end()
    });
}

const setUserName = (portConnection, message) => {
    let name = map.get(portConnection);

    if(!name) {
        map.set(portConnection, message)
    }
}

const getUserName = portConnection => {
    return map.get(portConnection);
}

const server = net.createServer(handdleConnection)

server.listen(4000, '127.0.0.1', () => {
    console.log("SERVIDOR ONLINE");
});