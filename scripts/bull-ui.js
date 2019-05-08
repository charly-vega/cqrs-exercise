const Arena = require('bull-arena');

const express = require('express');
const router = express.Router();

const arena = Arena({
  queues: [
    {
      name: 'event.balanceEntry',
      hostId: 'local'
    },
  ]
});
router.use('/', arena);

