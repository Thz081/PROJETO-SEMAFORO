const connection = require('../database/db'); 

exports.salvarDadosSensor = (req, res) => {
  console.log(' Dados recebidos no controller:', req.body);
  const { salaId, decibeis } = req.body;

  if (salaId === undefined || decibeis === undefined) {
    return res.status(400).json({ status: 'erro', mensagem: 'Dados incompletos.' });
  }

  const sql = 'INSERT INTO leituras_som (sala_id, decibeis) VALUES (?, ?)';
  const values = [salaId, decibeis];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('ERRO AO SALVAR DADOS NO BANCO ', err);
      return res.status(500).json({ status: 'erro', mensagem: 'Falha ao salvar os dados.' });
    }
    console.log(`Dados da sala ${salaId} salvos mano ID: ${results.insertId}`);
    return res.status(201).json({ status: 'sucesso', dadosRecebidos: req.body });
  });
};

exports.buscarUltimoDado = (req, res) => {
  const sql = "SELECT * FROM leituras_som ORDER BY id DESC LIMIT 1";

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar último dado:', err);
      return res.status(500).json({ status: 'erro', mensagem: 'Falha ao buscar dado.' });
    }
    if (results.length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ mensagem: 'Nenhum dado encontrado ainda.' });
    }
  });
};