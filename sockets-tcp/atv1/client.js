const net = require("net");
const readLine = require("readline");

const client = new net.Socket()
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

redCollor = '\u001b[31m';
resetCollor = '\u001b[0m';

client.connect(4000, "127.0.0.1",() => {
    console.log("Conexão con o servidor efetuada");
    rl.addListener('line', message => {
        client.write(message);
    })

    client.on('data', data => {
        console.log(redCollor + 'server:' + resetCollor + data.toString())
    })
})