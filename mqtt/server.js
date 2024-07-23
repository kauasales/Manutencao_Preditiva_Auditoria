// Importa as bibliotecas mosca e http
const mosca = require('mosca');
const teste = require('http');

// Cria um servidor http na porta 5000
const httpServer = teste.createServer((req, res) => {
  res.end('Servidor MQTT rodando na porta 5000');
});
httpServer.listen(5000);

// Define as configurações do servidor MQTT
const settings = {
  port: 1883, // Porta do servidor MQTT
  http: {
    port: 3001, // Porta do servidor http para o MQTT
    bundle: true // Habilita o pacote mqtt.js
  }
};

// Cria um objeto servidor MQTT usando as configurações definidas
const server = new mosca.Server(settings);

// Define uma função de callback para tratar os eventos de conexão do servidor MQTT
server.on('clientConnected', (client) => {
  // Imprime no console o identificador do cliente conectado
  console.log('Cliente conectado:', client.id);
});

// Define uma função de callback para tratar os eventos de publicação do servidor MQTT
server.on('published', (packet, client) => {
  // Imprime no console o tópico e o conteúdo da mensagem publicada
  console.log('Publicado:', packet.topic, packet.payload.toString());
});

// Define uma função de callback para tratar os eventos de inscrição do servidor MQTT
server.on('subscribed', (topic, client) => {
  // Imprime no console o tópico e o identificador do cliente inscrito
  console.log('Inscrito:', topic, client.id);
});

// Define uma função de callback para tratar os eventos de desconexão do servidor MQTT
server.on('clientDisconnected', (client) => {
  // Imprime no console o identificador do cliente desconectado
  console.log('Cliente desconectado:', client.id);
});

// Define uma função de callback para tratar os eventos de inicialização do servidor MQTT
server.on('ready', () => {
  // Imprime no console que o servidor MQTT está pronto
  console.log('Servidor MQTT pronto');
});
