const axios = require('axios');
const readLine = require("readline")
const rl = readLine.createInterface({ input: process.stdin, output: process.stdout })

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000
});

async function api(method, path, body) {
  if (method == "GET") {
    let response = await instance.get(path);
    console.log(JSON.stringify(response.data))
  }

  if (method == "POST") {
    let response = await instance.post(path, body);
    console.log(JSON.stringify(response.data))
  }

  if (method == "PUT") {
    let response = await instance.put(path, body);
    console.log()
    console.log(JSON.stringify(response.data))
  }

  if (method == "DELETE") {
    let response = await instance.delete(path);
    console.log(JSON.stringify(response.data))
  }
}


console.log("Olá!");
console.log("Para fins didáticos, sempre buscamos pelo ID 1, que é a segunda-feira rs");
console.log("1 - Listar dias");
console.log("2 - Buscar dia pelo ID ");
console.log("3 - Listar todas as tarefas de um determiado dia");
console.log("4 - Adicionar uma tarefa em um dia");
console.log("5 - Atualizar tarefa específica");
console.log("6 - Deletar tarefa específica");
console.log("7 - Retorna tarefa específica");

rl.addListener('line', message => {
  if (message == 1) {
    api("GET", "/days", null)
  }
  if (message == 2) {
    api("GET", "/days/1", null)
  }
  if (message == 3) {
    api("GET", "/days/1/tarefas", null)
  }
  if (message == 4) {
    let body = {"id": 1, "description": "Teste Atividade de kiev"}
    api("POST", "/days/1/tarefas", body)
  }
  if (message == 5) {
    let body = {"description": "Teste Atividade de kiev 100% ATUALIZADO"}
    api("PUT", "/days/1/tarefas/1", body)
  }
  if (message == 6) {
    api("DELETE", "/days/1/tarefas/1", null)
  }
  if (message == 7) {
    api("GET", "/days/1/tarefas/1", null)
  }

})