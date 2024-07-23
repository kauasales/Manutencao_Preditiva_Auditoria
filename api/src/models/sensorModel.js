const uuidv4 = require('uuid/v4');

class Sensor {
    constructor(nome, numeroSerie, fabricante, tipo, maxValor, minValor, maquinaId) {
        this.id = uuidv4();
        this.nome = nome;
        this.numeroSerie = numeroSerie;
        this.fabricante = fabricante;
        this.tipo = tipo;          // Tipo de Sensor
        this.maxValor = maxValor;
        this.minvalor = minValor;
        this.maquinaId = maquinaId // Referência à qual máquina o sensor está associado
    }
}

module.exports = { Sensor };