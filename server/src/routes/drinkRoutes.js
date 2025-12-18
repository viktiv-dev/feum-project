const express = require('express');
const router = express.Router();
const drinkController = require('../controllers/drinkController');

router.get('/', drinkController.getDrinks);
router.get('/:id', drinkController.getDrink);
router.post('/', drinkController.createDrink);
router.patch('/:id', drinkController.updateDrink);
router.delete('/:id', drinkController.deleteDrink);


module.exports = router;
