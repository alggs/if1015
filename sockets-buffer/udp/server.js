const dgram = require('dgram');

const socket = dgram.createSocket('udp4');

redCollor = '\u001b[31m';
blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

let firstMessage = true;

const msgInit = blueCollor + "Calculadora AVANÇADA!!\n" + redCollor + `Em 1 única mensagem, faça seu calculo usando os operadores +,-,/,*` + resetCollor +`\nExemplo de mensagem: 1+2 \nA saída será: 3`;

socket.on('message', (msg, rinfo) => {
    if (firstMessage) {
        firstMessage = false;
        socket.send(transformStringInBinary(msgInit), rinfo.port, rinfo.address);
        return;
    }

    try {
        operacao = eval(transformBinaryInString(msg)).toString(); //NÃO UTILIZAR EVAL, PELO AMOR DE DEUS. SÓ FOI MAIS FÁCIL PRA MIM <3 
    } catch (error) {
        socket.send("Expressão inválida! Utilize o padrão corretamente.", rinfo.port, rinfo.address)
        return;
    }
    
    socket.send(transformStringInBinary(operacao), rinfo.port, rinfo.address);
});

socket.on('listening', () => {
    const address = socket.address();
    console.log(`SERVER ONLINE ${address.address}:${address.port}`);
});

socket.bind(4000);

//Marshaller data
const transformStringInBinary =  message => {
    return Buffer.from(message);
}

//UnMarshaller data
const transformBinaryInString = data => {
    return data.toString('utf8');
}