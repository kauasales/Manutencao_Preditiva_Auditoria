const sensorModel = require('./sensorModel')

const sensoresDB = {
    data: [
        new sensorModel.Sensor('S1', 
                               '001', 
                               'Romi SA', 
                               'Temperatura', 
                               '20', 
                               '180')
    ],
    addSensor: function (sensor) {
        this.data.push(sensor);
    }
};

module.exports = sensoresDB;