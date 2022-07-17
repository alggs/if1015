const net = require("net");
const readLine = require("readline");

const client = new net.Socket()
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

client.connect(4000, "127.0.0.1",() => {
    rl.addListener('line', message => {
        client.write(message);
    })

    client.on('data', data => {
        console.log(data.toString())
    })
})