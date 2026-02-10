const { Router } = require("express");
const {createOrderItem, getOrderItems} = require("../controllers/orderController");
const router = Router();

router.post('', createOrderItem);

router.get('', getOrderItems);

module.exports = router;