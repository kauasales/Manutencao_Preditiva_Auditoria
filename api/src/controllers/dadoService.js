const mysql = require('mysql2');
const maquinasDB = require("../models/maquinasDB");

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

const getDadosColetadosTemp = (req, res) => {
    const { idSensor } = req.params; // Extrai o idMaquina dos parâmetros da rota

    // Conecta ao banco de dados
    const connection = connect();

    // Verifica se a conexão foi bem-sucedida
    if (connection) {
        // Realiza a consulta SQL para obter as temperaturas coletadas
        connection.query('SELECT * FROM TempColetada WHERE idSensor = ?', [idSensor], (error, results) => {
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

const getDadosColetadosUmid = (req, res) => {
    const { idSensor } = req.params; // Extrai o idMaquina dos parâmetros da rota

    // Conecta ao banco de dados
    const connection = connect();

    // Verifica se a conexão foi bem-sucedida
    if (connection) {
        // Realiza a consulta SQL para obter as temperaturas coletadas
        connection.query('SELECT * FROM UmidColetada WHERE idSensor = ?', [idSensor], (error, results) => {
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

const getGraficoTemperatura = (req, res) => {
    const { idMaquina } = req.params; // Extrai o idMaquina dos parâmetros da rota

    const connection = connect();

    if (connection) {
        const query = `
            SELECT 
                AVG(valor) as mediaTemperatura, 
                DATE_FORMAT(dataColeta, '%Y-%m-%d') as data, 
                LPAD(HOUR(horaColeta), 2, '0') as hora
            FROM TempColetada
            WHERE idSensor IN (
                SELECT idSensor FROM SensorTemp WHERE idMaquina = ?
            ) AND TIMESTAMP(dataColeta, horaColeta) >= NOW() - INTERVAL 24 HOUR
            GROUP BY data, hora
            ORDER BY data, hora;
        `;

        connection.query(query, [idMaquina], (error, results) => {
            if (error) {
                console.error('Erro ao realizar a consulta:', error);
                res.status(500).send('Erro ao realizar a consulta no banco de dados');
            } else {
                const mediasFinais = results.map(result => {
                    // Verifica se a data e a hora são válidas antes de criar o objeto Date
                    if (result.data && result.hora !== null) {
                        const dataHoraISO = `${result.data}T${result.hora}:00:00`;
                        return {
                            valor: result.mediaTemperatura,
                            dataHora: dataHoraISO
                        };
                    } else {
                        console.error('Data ou hora inválida:', result);
                        return null;
                    }
                }).filter(item => item); // Remove itens nulos

                // Imprime no console a quantidade de períodos
                console.log(`Enviando ${mediasFinais.length} períodos para o cliente.`);

                res.status(200).json(mediasFinais);
            }
        });

        connection.end();
    } else {
        res.status(500).send('Erro na conexão ao banco de dados');
    }
}

const getGraficoUmidade = (req, res) => {
    const { idMaquina } = req.params; // Extrai o idMaquina dos parâmetros da rota

    const connection = connect();

    if (connection) {
        const query = `
            SELECT 
                AVG(valor) as mediaUmidade, 
                DATE_FORMAT(dataColeta, '%Y-%m-%d') as data, 
                LPAD(HOUR(horaColeta), 2, '0') as hora
            FROM UmidColetada
            WHERE idSensor IN (
                SELECT idSensor FROM SensorUmid WHERE idMaquina = ?
            ) AND TIMESTAMP(dataColeta, horaColeta) >= NOW() - INTERVAL 24 HOUR
            GROUP BY data, hora
            ORDER BY data, hora;
        `;

        connection.query(query, [idMaquina], (error, results) => {
            if (error) {
                console.error('Erro ao realizar a consulta:', error);
                res.status(500).send('Erro ao realizar a consulta no banco de dados');
            } else {
                const mediasFinais = results.map(result => {
                    // Verifica se a data e a hora são válidas antes de criar o objeto Date
                    if (result.data && result.hora !== null) {
                        const dataHoraISO = `${result.data}T${result.hora}:00:00`;
                        return {
                            valor: result.mediaUmidade,
                            dataHora: dataHoraISO
                        };
                    } else {
                        console.error('Data ou hora inválida:', result);
                        return null;
                    }
                }).filter(item => item); // Remove itens nulos

                // Imprime no console a quantidade de períodos
                console.log(`Enviando ${mediasFinais.length} períodos para o cliente.`);

                res.status(200).json(mediasFinais);
            }
        });

        connection.end();
    } else {
        res.status(500).send('Erro na conexão ao banco de dados');
    }
}

module.exports = {
    getDadosColetadosTemp,
    getDadosColetadosUmid,
    getGraficoTemperatura,
    getGraficoUmidade
}