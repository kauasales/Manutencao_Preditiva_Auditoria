const uuidv4 = require('uuid/v4');
const sensoresDB = require('../models/sensoresDB')
const maquinasDB = require('../models/maquinasDB')
const mysql = require("mysql2");

function connect() {
    try {
        const connection = mysql.createConnection({
            host: '10.20.50.159',
            user: 'smp',
            password: '@1Smp',
            database: 'smp'

            /*
            host: 'localhost',
            user: 'root',
            password: '@1Sql',
            database: 'smp'
             */
        })

        return connection;
    }

    catch (error) {
        console.log("Erro na conexão ao banco de dados");
    }
}

const listSensoresTemp = (req, res) => {
    const { idMaquina } = req.params; // Extrai o idMaquina dos parâmetros da rota

    // Conecta ao banco de dados
    const connection = connect();

    // Verifica se a conexão foi bem-sucedida
    if (connection) {
        // Realiza a consulta SQL para obter os sensores da máquina específica
        connection.query('SELECT * FROM SensorTemp WHERE idMaquina = ?', [idMaquina], (error, results) => {
            if (error) {
                // Se houver um erro na consulta, envia uma resposta de erro
                console.error('Erro ao realizar a consulta:', error);
                res.status(500).send('Erro ao realizar a consulta no banco de dados');
            } else {
                // Se a consulta for bem-sucedida, envia os resultados como resposta
                res.status(200).json(results);
            }
        });

        // Fecha a conexão com o banco de dados
        connection.end();
    } else {
        // Se a conexão falhar, envia uma resposta de erro
        res.status(500).send('Erro na conexão ao banco de dados');
    }
}

const listSensoresUmid = (req, res) => {
    const { idMaquina } = req.params; // Extrai o idMaquina dos parâmetros da rota

    // Conecta ao banco de dados
    const connection = connect();

    // Verifica se a conexão foi bem-sucedida
    if (connection) {
        // Realiza a consulta SQL para obter os sensores da máquina específica
        connection.query('SELECT * FROM SensorUmid WHERE idMaquina = ?', [idMaquina], (error, results) => {
            if (error) {
                // Se houver um erro na consulta, envia uma resposta de erro
                console.error('Erro ao realizar a consulta:', error);
                res.status(500).send('Erro ao realizar a consulta no banco de dados');
            } else {
                // Se a consulta for bem-sucedida, envia os resultados como resposta
                res.status(200).json(results);
            }
        });

        // Fecha a conexão com o banco de dados
        connection.end();
    } else {
        // Se a conexão falhar, envia uma resposta de erro
        res.status(500).send('Erro na conexão ao banco de dados');
    }
}


const saveSensores = (req, res) => {
    connection = connect();

    const novoSensor = {
        idSensor: req.body.sensor.idSensor,
        modelo: req.body.sensor.modelo,
        fabricante: req.body.sensor.fabricanteSensor,
        numSerie: req.body.sensor.numeroSerieSensor,
        max: req.body.sensor.sensorMax,
        min: req.body.sensor.sensorMin,
        tipo: req.body.sensor.tipo,
        idMaquina: req.body.sensor.idMaquina
    }

    if (novoSensor.tipo === 'temperatura') {
        connection.query(`INSERT INTO sensortemp (idSensor, numSerie, fabricante, maxTemp, minTemp, idMaquina) VALUES 
    ('${novoSensor.idSensor}', '${novoSensor.numSerie}', '${novoSensor.fabricante}', '${novoSensor.max}', 
    '${novoSensor.min}', '${novoSensor.idMaquina}')`, (error, results) => {

            if (error) {
                res.status(500).json({ message: error.message });
                console.log("Sensor não cadastrado!");
                console.log("Tipo de erro: " + error.code);
                connection.end();
            } else {
                res.status(201).json({ message: 'Sensor cadastrado com sucesso!' });
                console.log("Sensor cadastrado com sucesso!");
                connection.end();
            }
        });

        console.log("Essa parte da api está funcionando normalmente");
    }

    else if (novoSensor.tipo === 'umidade') {
        connection.query(`INSERT INTO sensorumid (idSensor, numSerie, fabricante, maxUmid, minUmid, idMaquina) VALUES 
    ('${novoSensor.idSensor}', '${novoSensor.numSerie}', '${novoSensor.fabricante}', '${novoSensor.max}', 
    '${novoSensor.min}', '${novoSensor.idMaquina}')`, (error, results) => {

            if (error) {
                res.status(500).json({ message: error.message });
                console.log("Sensor não cadastrado!");
                console.log("Tipo de erro: " + error.code);
                connection.end();
            } else {
                res.status(201).json({ message: 'Sensor cadastrado com sucesso!' });
                console.log("Sensor cadastrado com sucesso!");
                connection.end();
            }
        });

        console.log("Essa parte da api está funcionando normalmente");
    }
}

const updateSensores = (req, res) => {

    const { sensorId, } = req.params;

    const sensorIndex = sensoresDB.data.findIndex(sensor => sensor.id === sensorId);

    if (sensorIndex === -1) {
        res.status(404).json({
            message: 'Sensor não encontrado na base',
            success: false,
            sensores: sensoresDB,
        });
    } else {
        const novoSensor = {
            id: sensorId,
            name: req.body.name,
            numeroSerie: req.body.numeroSerie,
            fabricante: req.body.fabricante,
            tipo: req.body.tipo,
            parametroMin: req.body.parametroMin,
            parametroMax: req.body.parametroMax,
            maquinaId: sensoresDB.data[sensorIndex].maquinaId
        };

        sensoresDB.data.splice(sensorIndex, 1, novoSensor);

        res.status(200).json({
            message: 'Sensor encontrado e atualizado com sucesso!',
            sucess: true,
            sensores: sensoresDB,
        });
    }
}

module.exports = {
    listSensoresTemp,
    listSensoresUmid,
    saveSensores,
    updateSensores,
}