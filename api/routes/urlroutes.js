const express = require('express');

const router = express.Router();

const urlController = require('../controllers/urlcontroller');

// Pass request to controller to handle
router.get('/', urlController.get);
router.post('/', urlController.post);
router.delete('/:id', urlController.remove);

module.exports = router;