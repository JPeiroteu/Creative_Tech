const express = require("express");
const router = express.Router();
const EventModel = require("../models/eventsModel");

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all events");
    let result = await EventModel.allEvents();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/:id/attendees', async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.session.userId;

    // Verifica se o usuário já está participando do evento
    const isGoing = await EventModel.isUserGoing(eventId, userId);
    if (isGoing) {
      return res.status(400).send('Você já está participando deste evento.');
    }

    // Adiciona o usuário como participante do evento
    await EventModel.addAttendee(eventId, userId);

    res.send('Participante adicionado com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao adicionar o participante.');
  }
});

router.delete('/:id/attendees', async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.session.userId;

    const isGoing = await EventModel.isUserGoing(eventId, userId);
    if (!isGoing) {
      return res.status(400).send('Você não está participando deste evento.');
    }
    await EventModel.removeAttendee(eventId, userId);

    res.send('Participante removido com sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao remover o participante.');
  }
});



module.exports = router;