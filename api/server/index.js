/* Configurações das Bibliotecas */
const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const maquinasDB = require('../src/models/maquinasDB')

const app = express()

// Carregar dados existentes do arquivo JSON
const filePath = path.join(__dirname, '..', 'src', 'models', 'maquinas1.json');
try {
    const dadosJson = fs.readFileSync(filePath, 'utf-8');
    maquinasDB.data = JSON.parse(dadosJson);
    console.log('Dados carregados do arquivo JSON.');
} catch (error) {
    console.error('Erro ao carregar dados do arquivo JSON:', error);
}

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Usando o módulo cors
const cors = require('cors');
app.use(cors());

const routes = require('../src/routes-web.js');    // API para enviar e receber dados
routes(app);


const port = process.env.PORT || 8000 //Se a variavel de ambiente PORT não estiver com valor, usaremos a 8000
// Subindo server em porta desejada
app.listen(port, () => {
    console.log(`----------- APP INICIADA NA PORTA ${port} -----------`)
})