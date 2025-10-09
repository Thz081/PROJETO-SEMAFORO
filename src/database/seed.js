const connection = require('./db'); 

console.log('Iniciando script para popular o banco de dados...');

async function runSeed() {
  try {
    const leituras = [];
    const NUM_SALAS = 12;
    const NUM_LEITURAS_POR_SALA = 20;

    for (let i = 1; i <= NUM_SALAS; i++) {
      for (let j = 0; j < NUM_LEITURAS_POR_SALA; j++) {
        
        const decibeis = (40 + Math.random() * 50).toFixed(2);
        leituras.push([i, decibeis]);
      }
    }

    await connection.query('TRUNCATE TABLE leituras_som'); 
    console.log('Tabela leituras_som limpa para nova inserção.');

    const sql = 'INSERT INTO leituras_som (sala_id, decibeis) VALUES ?';
    const [results] = await connection.query(sql, [leituras]); 

    console.log(`>>> ${results.affectedRows} registros de leituras FALSOS inseridos com sucesso!`);
  } catch (err) {
    console.error("Erro ao inserir dados em massa:", err);
  } finally {
    await connection.end(); 
    console.log('Conexão com o banco fechada.');
  }
}

runSeed();