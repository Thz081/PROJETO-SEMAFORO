const connection = require('../database/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    await connection.query(sql, [username, hashedPassword]);

    res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error("ERRO AO REGISTRAR:", err);
    res.status(500).json({ mensagem: 'Erro ao registrar. O usuário pode já existir.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE username = ?';
    const [users] = await connection.query(sql, [username]);

    if (users.length === 0) {
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
    
      req.session.userId = user.id;
      req.session.username = user.username;
      res.status(200).json({ mensagem: `Login realizado com sucesso! Bem-vindo, ${user.username}!` });
    } else {
      res.status(401).json({ mensagem: 'Usuário ou senha inválidos.' });
    }
  } catch (err) {
    console.error("ERRO AO LOGAR:", err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ mensagem: 'Não foi possível fazer logout.' });
    }
    
    res.clearCookie('connect.sid');
    res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  });
};

exports.checkAuthStatus = (req, res) => {

  res.status(200).json({ 
    status: 'autenticado', 
    userId: req.session.userId, 
    username: req.session.username 
  });
};