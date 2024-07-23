const mqtt = require('mqtt')
const host = '10.20.50.68'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const mysql = require('mysql2');

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    client: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
})

const subTopics = ['temp/FAB1TEMP123', 'umid/FAB1UMID123'];
let temperature;
let humidity;
let date;
let time;

client.on('error', (error) => {
    console.error('Erro de conexão:', error);
});

client.on('close', () => {
    console.log('Conexão fechada');
});

client.on('offline', () => {
    console.log('Cliente offline');
});

client.on('reconnect', () => {
    console.log('Tentando reconectar');
});

client.on('connect', () => {
    console.log("Conectado")
    client.subscribe(subTopics, () => {
        console.log(`Subscribe to topics '${subTopics.join(', ')}`);
    })
})

client.on('message', (topic, message) => {

    const dataHoraAtual = new Date();

    const dia = String(dataHoraAtual.getDate()).padStart(2, '0');
    const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataHoraAtual.getFullYear();
    const hora = String(dataHoraAtual.getHours()).padStart(2, '0');
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataHoraAtual.getSeconds()).padStart(2, '0');

    date = `${dia}-${mes}-${ano}`;
    time = `${hora}:${minutos}:${segundos}`;

    console.log(`Data medição: ${date}`);
    console.log(`Hora medição: ${time}`);

    if (topic.slice(0,4) === 'temp') {
        console.log(`Mensagem recebida no tópico '${topic}': ${message.toString()} ºC`);
        temperature = parseFloat(message);
        console.log(temperature);

        const connection = connect();

        connection.query(`INSERT INTO TempColetada (valor, dataColeta, horaColeta, idSensor) VALUES 
    (${temperature}, STR_TO_DATE('${date}', '%d-%m-%Y'), '${time}', '${topic.slice(5)}')`, (error, results) => {
            if (error) {
                console.error("Erro ao inserir temperatura: " + error.message);
            } else {
                console.log("Dados de temperatura inseridos com sucesso.");
            }
        });

        connection.end();
    }

    if (topic.slice(0,4) === 'umid') {
        console.log(`Mensagem recebida no tópico '${topic}': ${message.toString()} %`);
        humidity = parseFloat(message);
        console.log(humidity);

        const connection = connect();

        connection.query(`INSERT INTO UmidColetada (valor, dataColeta, horaColeta, idSensor) VALUES 
    (${humidity}, STR_TO_DATE('${date}', '%d-%m-%Y'), '${time}', '${topic.slice(5)}')`, (error, results) => {
            if (error) {
                console.error("Erro ao inserir umidade: " + error.message);
            } else {
                console.log("Dados de umidade inseridos com sucesso.");
            }
        });

        connection.end();
    }
});

function connect() {
    try {
        const connection = mysql.createConnection({
            host: '10.20.50.159',
            user: 'smp',
            password: '@1Smp',
            database: 'smp'
        })

        return connection;
    }

    catch (e) {
        console.log("Erro na conexão ao banco de dados");
    }
}
