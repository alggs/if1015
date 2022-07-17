const net = require('net');
const readLine = require("readline");
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

redCollor = '\u001b[31m';
blueCollor = '\u001b[34m';
resetCollor = '\u001b[0m';

const handdleConnection = socket => {
    
    socket.write(blueCollor + "Calculadora AVANÇADA!!\n" + redCollor + `Em 1 única mensagem, faça seu calculo usando os operadores +,-,/,*` + resetCollor +`\nExemplo de mensagem: 1+2 \nA saída será: 3`);
    
    socket.on('data', (data) => {
        const msg = data.toString();

        let operacao
        
        try {
            operacao = eval(msg).toString();
        } catch (error) {
            socket.write("Expressão inválida! Utilize o padrão corretamente.")
            return
        }
        
        socket.write(operacao)
        
    });
    
    socket.on('error', (e) => {
        socket.end()
    });
}

const server = net.createServer(handdleConnection)

server.listen(4000, '127.0.0.1', () => {
    console.log("SERVIDOR ONLINE");
});