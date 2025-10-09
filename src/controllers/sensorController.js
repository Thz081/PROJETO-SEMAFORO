const connection = require('../database/db');

function getStatusDoRuido(decibeis) {
  if (decibeis > 80) return 'Preocupante';
  if (decibeis > 65) return 'Moderado';
  if (decibeis > 50) return 'Normal';
  return 'Calmo';
}

exports.salvarDados = async (req, res) => {
  try {
    const { salaId, decibeis } = req.body;
    if (salaId === undefined || decibeis === undefined) {
      return res.status(400).json({ mensagem: 'Dados incompletos.' });
    }
    const sql = 'INSERT INTO leituras_som (sala_id, decibeis) VALUES (?, ?)';
    await connection.query(sql, [salaId, decibeis]);
    res.status(201).json({ status: 'sucesso', dadosRecebidos: req.body });
  } catch (err) {
    console.error("ERRO AO SALVAR:", err);
    res.status(500).json({ status: 'erro', mensagem: 'Falha ao salvar.' });
  }
};

exports.buscarStatusAtual = async (req, res) => {
  try {
    const sql = `
      SELECT l.*, s.nome_sala, s.logo_url 
      FROM leituras_som l
      JOIN salas s ON l.sala_id = s.id
      WHERE l.id IN (SELECT MAX(id) FROM leituras_som GROUP BY sala_id)
      ORDER BY l.sala_id;
    `;
    const [leituras] = await connection.query(sql);
    
    const leiturasComStatus = leituras.map(leitura => ({
      ...leitura,
      status: getStatusDoRuido(leitura.decibeis)
    }));

    res.status(200).json(leiturasComStatus);
  } catch (err) {
    console.error("ERRO AO BUSCAR STATUS ATUAL:", err);
    res.status(500).json({ status: 'erro', mensagem: 'Falha ao buscar.' });
  }
};

exports.buscarHistoricoSala = async (req, res) => {
   
};

exports.gerarAnaliseSala = async (req, res) => {
    
};