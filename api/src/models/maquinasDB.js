const maquinaModel = require('./maquinaModel');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const maquinasDB = {

        filePath: path.join(__dirname, 'maquinas1.json'),

        data: [
            new maquinaModel.Maquina(uuidv4(),
                                    'Maquina Injetora',
                                     '12-01-2021',
                                     '2005',
                                     'Toyota',
                                     '129893002023',
                                     'X')
              ],

        addMaquina: function (maquina) {
            const novaMaquina = new maquinaModel.Maquina(maquina)
            this.data.push(novaMaquina);
            },

        salvaDadosJSON: function () {
                

                // Lê os dados existentes do arquivo
                let dadosExistents = [];

                try {
                    const dadosJson = fs.readFileSync(filePath, 'utf-8');
                    dadosExistents = JSON.parse(dadosJson);
                } catch (error) {

                }
                // Adiciona os novos dados
                this.data.forEach((maquina) => dadosExistents.push(maquina));
                
                const dadosJson = JSON.stringify(this.data, null, 2);

                fs.writeFile(this.filePath, dadosJson, 'utf-8', (err) => {
                    if (err) {
                        console.error('Erro ao salvar arquivo:', err);
                    } else {
                        console.log('Arquivo salvo com sucesso!');
                    }
                });
            },
};

module.exports = maquinasDB ;