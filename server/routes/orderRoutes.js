const { Router } = require("express");
const {createOrderItem, getOrderItems, getOrderItemById} = require("../controllers/orderController");
const router = Router();

router.get('', getOrderItems);

router.get('/:id', getOrderItemById);

router.post('', createOrderItem);


module.exports = router;