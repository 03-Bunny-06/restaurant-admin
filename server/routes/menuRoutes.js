const {Router} = require("express");
const {createMenuItem, getMenuItems} = require("../controllers/menuItemController.js");
const router = Router();

router.post('/', createMenuItem);

router.get('', getMenuItems);

module.exports = router;