const { Router } = require("express");
const createOrderItem = require("../controllers/orderController");
const router = Router();

router.post('', createOrderItem);

module.exports = router;