const { Router } = require("express");
const {createOrderItem, getOrderItems, getOrderItemById, changeOrderStatus} = require("../controllers/orderController");
const router = Router();

router.get('', getOrderItems);

router.get('/:id', getOrderItemById);

router.post('', createOrderItem);

router.patch('/:id/status', changeOrderStatus);

module.exports = router;