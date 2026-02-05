const {Router} = require("express");
const {createMenuItem, getMenuItems, searchMenuItems, getMenuItemById} = require("../controllers/menuItemController.js");
const router = Router();

router.post('/', createMenuItem);

router.get('', getMenuItems);

router.get('/search', searchMenuItems);

router.get('/:id', getMenuItemById);

module.exports = router;