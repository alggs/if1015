const dgram = require('dgram');
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout });

const socket = dgram.createSocket('udp4');

redCollor = '\u001b[31m';
blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

let firstMessage = true;

const msgInit = blueCollor + "Calculadora AVANÇADA!!\n" + redCollor + `Em 1 única mensagem, faça seu calculo usando os operadores +,-,/,*` + resetCollor +`\nExemplo de mensagem: 1+2 \nA saída será: 3`;

socket.on('message', (msg, rinfo) => {
    if (firstMessage) {
        firstMessage = false;
        socket.send(msgInit, rinfo.port, rinfo.address);
        return;
    }

    try {
        operacao = eval(msg.toString()).toString();
    } catch (error) {
        socket.send("Expressão inválida! Utilize o padrão corretamente.", rinfo.port, rinfo.address)
        return;
    }
    
    socket.send(operacao, rinfo.port, rinfo.address);
});

socket.on('listening', () => {
    const address = socket.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

socket.bind(4000);