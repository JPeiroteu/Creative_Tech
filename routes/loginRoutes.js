const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/usersModel');

router.post('/login', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    // Verifica se o email existe na base de dados
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).send({ message: 'Email ou senha incorretos.' });
    }

    // Verifica se a senha está correta
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Email ou senha incorretos.' });
    }

    // Se chegou aqui, o login foi bem-sucedido
    res.render('successful', { name: user.name });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Ocorreu um erro ao processar a requisição.' });
  }
});

module.exports = router;
