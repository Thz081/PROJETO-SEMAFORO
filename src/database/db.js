const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projeto_semaforo_db' 
});

connection.connect((err) => {
  if (err) {
    console.error('--- ERRO AO CONECTAR NO BANCO ---', err.stack);
    return;
  }
  console.log('>>> Conexão com o banco MySQL estabelecida!');
});

module.exports = connection.promise(); 