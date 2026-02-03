const {Router} = require("express");
const createMenuItem = require("../controllers/menuItemController.js");
const router = Router();

router.post('/', createMenuItem);

module.exports = router;