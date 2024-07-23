
/* Navegação */

module.exports = app => {

    /* Tela Inicial */
    app.get('/', (req, res) => {
        res.render('home/index');    
      });
    
    /* Máquinas */
    app.get('/cadastro', (req, res) => {
        res.render('cadastro/maquinas');
    });

    /* Sensores */
    app.get('/sensores', (req, res) => {
        res.render('cadastro/sensores');
    })

    // Teste
    app.get("/api/maquina", (req, res) => {
        res.json({ message: "Máquina Cadastrada!"});
      })

    // Todas as outras solicitações GET não tratadas retornarão ao app em React
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.js'));
    });
}