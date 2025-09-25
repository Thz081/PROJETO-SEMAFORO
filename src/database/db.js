const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projeto_semaforo_db'
});

connection.connect((err) => {
  if (err) {
    console.error('ERRO AO CONECTAR NO BANCO DE DADOS');
    console.error(err.stack);
    return;
  }
  console.log('conectou certinho ao banco');
});

module.exports = connection; 