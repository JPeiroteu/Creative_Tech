const express = require('express');
const router = express.Router();
const Event = require('../models/eventsModel');

router.get('/events', (req, res) => {
  eventsModel.getAll((err, events) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error consulting events');
    }

    res.render('events.html', { events });
  });
});

module.exports = router;
