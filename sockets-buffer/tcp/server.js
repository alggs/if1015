const net = require('net');

redCollor = '\u001b[31m';
blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

const initMessage = blueCollor + "Calculadora AVANÇADA!!\n" + redCollor + `Em 1 única mensagem, faça seu calculo usando os operadores +,-,/,*` + resetCollor +`\nExemplo de mensagem: 1+2 \nA saída será: 3`;

const handdleConnection = socket => {
    
    socket.write(transformStringInBinary(initMessage));
    
    listeningData(socket);
    
    socket.on('error', (e) => {
        socket.end()
    });
}

const server = net.createServer(handdleConnection)

server.listen(4000, '127.0.0.1', () => {
    console.log("SERVIDOR ONLINE");
});

//Client invoker
const listeningData = socket => {
    socket.on('data', (data) => {
        const msg = transformBinaryInString(data);

        let operacao;
        
        try {
            operacao = eval(msg).toString(); //NÃO UTILIZAR EVAL, PELO AMOR DE DEUS. SÓ FOI MAIS FÁCIL PRA MIM <3 
        } catch (error) {
            socket.write("Expressão inválida! Utilize o padrão corretamente.")
            return
        }

        socket.write(transformStringInBinary(operacao))

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