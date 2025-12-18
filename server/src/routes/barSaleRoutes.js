const express = require('express');
const router = express.Router();
const barSaleController = require('../controllers/barSaleController');

router.get('/', barSaleController.getBarSales);
router.get('/:id', barSaleController.getBarSale);
router.post('/', barSaleController.createBarSale);
router.patch('/:id', barSaleController.updateBarSale);
router.delete('/:id', barSaleController.deleteBarSale);
router.get("/event/:eventId", barSaleController.getBarSalesByEvent);

module.exports = router;
