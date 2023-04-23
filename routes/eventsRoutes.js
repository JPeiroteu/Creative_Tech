const express = require('express');
const router = express.Router();
const Event = require('../models/eventsModel');

// Função para renderizar a página de eventos
exports.renderEventsPage = async (req, res) => {
  try {
    // Recuperar todos os eventos do banco de dados
    const events = await Event.findAll();

    // Renderizar a página events.html passando os eventos como parâmetro
    res.render('events.html', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao recuperar eventos');
  }
};

module.exports = router;