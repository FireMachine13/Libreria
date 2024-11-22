const express = require('express');
const router = express.Router();
const libreriaController = require('../controllers/libreriaController');

router.get('/books', libreriaController.getBooks);
router.post('/books', libreriaController.createBooks);
router.put('/books/:id', libreriaController.updateBooks);
router.delete('/books/:id', libreriaController.deleteBooks);

module.exports = router;
