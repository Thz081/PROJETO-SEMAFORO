function checarAutenticacao(req, res, next) {
  if (req.session && req.session.userId) {
    next(); 
  } else {
    res.status(401).json({ mensagem: 'Acesso não autorizado. Faça o login primeiro.' });
  }
}

module.exports = checarAutenticacao;