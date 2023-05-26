const express = require("express");
const router = express.Router();
const EventModel = require("../models/eventsModel");

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all events");
    const userId = req.session.user ? req.session.user.id : null;
    let result = await EventModel.allEvents(userId);
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/:id/attendees', async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.session.user ? req.session.user.id : null;

    // Verifica se o usuário já está participando do evento
    const isGoing = await EventModel.isUserGoing(eventId, userId);
    if (isGoing) {
      return res.status(400).json({ error: 'Você já está participando deste evento.' });
    }

    // Adiciona o usuário como participante do evento
    await EventModel.addAttendee(eventId, userId);

    // Atualiza o número de participantes
    const attendees = await EventModel.getAttendeesCount(eventId);
    res.json({ attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao adicionar o participante.' });
  }
});

router.delete('/:id/attendees', async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.session.user ? req.session.user.id : null;

    if (!userId) {
      return res.status(400).json({ error: 'É necessário fazer login para cancelar a participação no evento.' });
    }

    const isGoing = await EventModel.isUserGoing(eventId, userId);
    if (!isGoing) {
      return res.status(400).json({ error: 'Você não está participando deste evento.' });
    }
    
    // Remove o usuário como participante do evento
    await EventModel.removeAttendee(eventId, userId);

    // Atualiza o número de participantes
    const attendees = await EventModel.getAttendeesCount(eventId);
    res.json({ attendees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao remover o participante.' });
  }
});

module.exports = router;
