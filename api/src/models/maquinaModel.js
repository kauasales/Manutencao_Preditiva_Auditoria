const uuidv4 = require('uuid/v4');

class Maquina {
    constructor (maquinaId, nome, data, modelo, fabricante, numeroSerie, localSetor, ativada){
        this.maquinaId = uuidv4();
        this.nome = nome;
        this.data = data;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.numeroSerie = numeroSerie;
        this.localSetor = localSetor;
        this.ativada = ativada;
        this.sensores = []; // Lista de sensores associados à máquina
    }
}

module.exports = { Maquina };