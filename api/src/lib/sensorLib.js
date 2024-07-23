const Sensor = require('../models/sensorModel');

const adicionarSensor = (nome, tipo, maxValor, minValor) => {
    const novoSensor = new Sensor(nome, tipo, maxValor, minValor);

    // Simulação: adicionar o sensor a um array em memória
    sensores.push(novoSensor);
    return novoSensor;
};

const obterSensores = () => {
    // Simulação: Retorna a lista de sensores em memória
    return sensores.map(sensor => {

        // Adicionando tipo de sensor ao objeto retornado
        return {
            nome: sensor.nome,
            tipo: sensor.tipo,
            maxValor: sensor.maxValor,
            minValor: sensor.minValor
        };
    });
};

// Array em memoria para simular o banco de dados
const sensores = [];

module.exports = {
    adicionarSensor,
    obterSensores
};