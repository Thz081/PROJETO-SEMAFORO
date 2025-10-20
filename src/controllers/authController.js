const crypto = require('crypto');
const { enviarEmailRecuperacao } = require('../services/emailService'); 
const connection = require('../database/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ mensagem: 'Email, usuário e senha são obrigatórios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = 'INSERT INTO usuarios (email, username, password) VALUES (?, ?, ?)';
  
    await connection.query(sql, [email, username, hashedPassword]);
    
    res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error("ERRO AO REGISTRAR:", err);
    res.status(500).json({ mensagem: 'Erro ao registrar. O email ou usuário pode já existir.' });
  }
};


exports.login = async (req, res) => {
  try {
  
    const { identifier, password } = req.body;
    
    const sql = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
    const [users] = await connection.query(sql, [identifier, identifier]);

    if (users.length === 0) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.status(200).json({ mensagem: `Login realizado com sucesso! Bem-vindo, ${user.username}!` });
    } else {
      res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }
  } catch (err) {
    console.error("ERRO AO LOGAR:", err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ mensagem: 'O e-mail é obrigatório.' });
    }

    const sqlFindUser = 'SELECT * FROM usuarios WHERE email = ?';
    const [users] = await connection.query(sqlFindUser, [email]);

    if (users.length === 0) {
      console.log(`Tentativa de recuperação para e-mail não cadastrado: ${email}`);
      return res.status(200).json({ mensagem: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.' });
    }
    const user = users[0];

    const resetToken = crypto.randomBytes(32).toString('hex');

    const expires = new Date(Date.now() + 3600000);

    const sqlUpdateToken = 'UPDATE usuarios SET reset_token = ?, reset_token_expires = ? WHERE id = ?';
    await connection.query(sqlUpdateToken, [resetToken, expires, user.id]);

    const emailEnviado = await enviarEmailRecuperacao(user.email, resetToken);

    if (emailEnviado) {
      res.status(200).json({ mensagem: 'Se o e-mail estiver cadastrado, você receberá um link para redefinir a senha.' });
    } else {
      res.status(500).json({ mensagem: 'Erro ao enviar o e-mail de recuperação.' });
    }

  } catch (err) {
    console.error("ERRO EM FORGOT PASSWORD:", err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ mensagem: 'Token e nova senha são obrigatórios.' });
    }

    const sqlFindUser = 'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expires > NOW()';
    const [users] = await connection.query(sqlFindUser, [token]);

    if (users.length === 0) {
      return res.status(400).json({ mensagem: 'Token inválido ou expirado.' });
    }
    const user = users[0];

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const sqlUpdatePassword = 'UPDATE usuarios SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?';
    await connection.query(sqlUpdatePassword, [hashedPassword, user.id]);

    if (req.session) {
        req.session.destroy();
    }

    res.status(200).json({ mensagem: 'Senha redefinida com sucesso!' });

  } catch (err) {
    console.error("ERRO EM RESET PASSWORD:", err);
    res.status(500).json({ mensagem: 'Erro interno no servidor ao redefinir a senha.' });
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