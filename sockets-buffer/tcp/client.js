const net = require("net");
const readLine = require("readline");

const socket = new net.Socket()
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

socket.connect(4000, "127.0.0.1", () => {
    rl.addListener('line', message => {
        socket.write(transformStringInBinary(message));
    })

    listeningData(socket)
})


//Client invoker
const listeningData = socket => {
    socket.on('data', data => {
        console.log(transformBinaryInString(data));
    });
}

//Marshaller data
const transformStringInBinary =  message => {
    return Buffer.from(message);
}

//UnMarshaller data
const transformBinaryInString = data => {
    return data.toString('utf8');
}
