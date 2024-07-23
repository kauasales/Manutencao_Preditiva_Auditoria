const controllerMaquinas = require("./controllers/maquinaService");
const controllerDados = require("./controllers/dadoService");
const controllerSensores = require("./controllers/sensorService");
module.exports = app => {

    /* Rota para máquinas */
    const controllerMaquinas = require('./controllers/maquinaService')
    app.route('/api/maquinas')
        .get(controllerMaquinas.listMaquinas)
        .post(controllerMaquinas.saveMaquinas)

    app.route('/api/maquinas/:idMaquina')
        .get(controllerMaquinas.getMaquina)
        .put(controllerMaquinas.updateMaquinas)

    /* Rota para sensores */
    const controllerSensores = require('./controllers/sensorService')
    app.route('/api/sensores')
        .post(controllerSensores.saveSensores)

    app.route('/api/sensores/temperatura/:idMaquina')
        .get(controllerSensores.listSensoresTemp)
    
    app.route('/api/sensores/umidade/:idMaquina')
        .get(controllerSensores.listSensoresUmid)

    app.route('/api/maquinas/:maquinaId/sensores/:sensorId')
        .put(controllerSensores.updateSensores)

    /* Rota para test */
    const test = require('./controllers/test')
    app.post('/api/test', test.returnJson);

    /* Rota para dados coletados */
    const controllerDados = require('./controllers/dadoService')
    app.route('/api/dados/temperatura/:idSensor')
        .get(controllerDados.getDadosColetadosTemp)
    
    app.route('/api/dados/umidade/:idSensor')
        .get(controllerDados.getDadosColetadosUmid)

    app.route('/api/dados/graficoTemperatura/:idMaquina')
        .get(controllerDados.getGraficoTemperatura)

    app.route('/api/dados/graficoUmidade/:idMaquina')
        .get(controllerDados.getGraficoUmidade)
}