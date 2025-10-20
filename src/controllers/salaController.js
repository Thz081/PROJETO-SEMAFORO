const connection = require('../database/db');

exports.listarSalas = async (req, res) => {
  try {
    const sql = "SELECT * FROM salas ORDER BY id";
    const [salas] = await connection.query(sql);
    res.status(200).json(salas);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar salas." });
  }
};

exports.obterSalaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM salas WHERE id = ?";
    const [salas] = await connection.query(sql, [id]);
    if (salas.length === 0) {
      return res.status(404).json({ mensagem: "Sala não encontrada." });
    }
    res.status(200).json(salas[0]);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar sala." });
  }
};

exports.criarSala = async (req, res) => {
  try {
    const { nome_sala, logo_url } = req.body;
    if (!nome_sala) {
      return res.status(400).json({ mensagem: "O nome da sala é obrigatório." });
    }
    const sql = "INSERT INTO salas (nome_sala, logo_url) VALUES (?, ?)";
    const [result] = await connection.query(sql, [nome_sala, logo_url || null]);
    res.status(201).json({ id: result.insertId, nome_sala, logo_url });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao criar sala." });
  }
};

exports.atualizarSala = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_sala, logo_url } = req.body;
    const sql = "UPDATE salas SET nome_sala = ?, logo_url = ? WHERE id = ?";
    await connection.query(sql, [nome_sala, logo_url, id]);
    res.status(200).json({ mensagem: "Sala atualizada com sucesso." });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao atualizar sala." });
  }
};

exports.deletarSala = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM salas WHERE id = ?";
    await connection.query(sql, [id]);
    res.status(200).json({ mensagem: "Sala deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao deletar sala." });
  }
};