const {Router} = require("express");
const {createMenuItem, getMenuItems, searchMenuItems, getMenuItemById, deleteMenuItem, updateMenuItem, toggleAvailabilityStatus} = require("../controllers/menuItemController.js");
const router = Router();

router.post('/', createMenuItem);

router.get('', getMenuItems);

router.get('/search', searchMenuItems);

router.get('/:id', getMenuItemById);

router.put('/:id', updateMenuItem);

router.delete('/:id', deleteMenuItem);

router.patch('/:id/availability', toggleAvailabilityStatus);

module.exports = router;