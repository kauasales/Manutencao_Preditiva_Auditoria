const maquinasDB = require('../models/maquinasDB');
const mysql = require('mysql2');

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

// Visualizar Máquinas
const listMaquinas = (req, res) => {
    const connection = connect();
    connection.query('SELECT * FROM maquina', (error, results) => {
        if (error) {
            // Se houver erro na consulta, envia uma resposta de erro
            res.status(500).json({ message: error.message });
        } else {
            // Se a consulta for bem-sucedida, envia os resultados como resposta
            res.status(200).json(results);
        }
        connection.end();
    });
};

// Cadastrar nova máquina
const saveMaquinas = (req, res) => {
    connection = connect();

    const novaMaquina = {
        idMaquina: req.body.maquina.idMaquina,
        nome: req.body.maquina.nome,
        dataInstalacao: req.body.maquina.dataInstalacao,
        modelo: req.body.maquina.modelo,
        fabricante: req.body.maquina.fabricante,
        numSerie: req.body.maquina.numSerie,
        setor: req.body.maquina.setor,
    }

    connection.query(`INSERT INTO maquina (idMaquina, nome, numSerie, dataInstalacao, fabricante, modelo, setor) VALUES 
    ('${novaMaquina.idMaquina}', '${novaMaquina.nome}', '${novaMaquina.numSerie}', 
    STR_TO_DATE('${novaMaquina.dataInstalacao}', '%Y-%m-%d'), '${novaMaquina.fabricante}', '${novaMaquina.modelo}', 
    '${novaMaquina.setor}')`, (error, results) => {

        if (error) {
            res.status(500).json({ message: error.message });
            console.log("Máquina não cadastrada!");
            console.log("Tipo de erro: " + error.code);
            connection.end();
        } else {
            res.status(201).json({ message: 'Máquina cadastrada com sucesso!' });
            console.log("Máquina cadastrada com sucesso!");
            connection.end();
        }
    });
}

// Editar máquina
const updateMaquinas = (req, res) => {

    // Qual maquina foi selecionada
    const { maquinaId, } = req.params;

    // Verifica na lista de máquinas cadastradas
    const maquinaIndex = maquinasDB.data.findIndex(maquina => maquina.id === maquinaId);

    // Se a máquina não foi encontrada retorna 404
    if (maquinaIndex === -1) {
        res.status(404).json({
            message: 'Máquina não encontrada na base.',
            sucess: false,
            maquinas: maquinasDB,
        });
    } else {
        const novaMaquina = {
            id: maquinaId,
            name: req.body.name,
            dataInstalacao: req.body.dataInstalacao,
            modelo: req.body.modelo,
            fabricante: req.body.fabricante,
            numeroSerie: req.body.numeroSerie,
            setor: req.body.setor,
            sensores: maquinasDB.data[maquinaIndex].sensores
        };

        maquinasDB.data.splice(maquinaIndex, 1, novaMaquina);

        res.status(200).json({
            message: 'Máquina encontrada e atualizada com sucesso!',
            success: true,
            maquinas: maquinasDB,
        });
    }
}

const getMaquinaSensores = (req, res) => {
    const { maquinaId } = req.params;

    // Verifica na lista de máquinas cadastradas
    const maquina = maquinasDB.data.find(m => m.id === maquinaId);

    // Se a máquina não foi encontrada retorna 404
    if (!maquina) {
        res.status(404).json({
            message: 'Máquina não encontrada na base.',
            sucess: false,
            maquinas: maquinasDB,
        });
    } else {
        res.status(200).json(maquina.sensores)
    }
}

const getMaquina = (req, res) => {
    const { idMaquina } = req.params; // Extrai o idMaquina dos parâmetros da rota

    const connection = connect();
    connection.query('SELECT * FROM maquina WHERE idMaquina = ?', [idMaquina], (error, results) => {
        if (error) {
            // Se houver erro na consulta, envia uma resposta de erro
            res.status(500).json({ message: error.message });
            console.log("Tipo de erro: " + error.code);
            connection.end();
        } else {
            // Se a consulta for bem-sucedida e a máquina for encontrada, envia os resultados como resposta
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                // Se nenhum resultado for encontrado, envia uma resposta indicando que a máquina não existe
                res.status(404).json({ message: 'Máquina não encontrada.' });
            }
            connection.end();
        }
    });
};

module.exports = {
    listMaquinas,
    saveMaquinas,
    updateMaquinas,
    getMaquinaSensores,
    getMaquina
}

/*

const getAllDocs = asyncHandler(async (req, res) => {
    try {
        const data = req.body
        res.status(200).json(data);
    } catch (e) {
        throw err
    }
})

const createDoc = (req, res) => {
    try {
        const machineName = req.body.name;
        const sensorType = req.body.sensorTipo;
        const maxTemp = req.body.tempMax;
        const minTemp = req.body.tempMin;

        const novoSensor = {
            nome: machineName,
            tipo: sensorType,
            maxTemp: maxTemp,
            minTemp: minTemp
        }

        sensores.addSensor(novoSensor);

        res.status(201).json({mensagem: 'Sensor cadastrado!', sensor: novoSensor});
    } catch(e) {
        console.error(e);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    console.log(`req.body = ${JSON.stringify(req.body)}`)
}

module
 */