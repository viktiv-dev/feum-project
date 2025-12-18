const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getInventories);
router.get('/:id', inventoryController.getInventory);
router.get('/event/:id', inventoryController.getInventoryByEvent);
router.post('/', inventoryController.createInventory);
router.patch('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);
router.delete('/event/:id', inventoryController.deleteInventoryByEvent);
router.get("/event/name/:eventName", inventoryController.getInventoryByEventName);
router.post("/bulk/save-with-bar-sales", inventoryController.saveInventoryWithBarSales);


module.exports = router;
