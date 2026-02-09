const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Menu = require("../models/menuItemModel");

const createOrderItem = async(req, res) => {
    const items = req.body.items;
    const status = req.body.status;
    const customerName = req.body.customerName;
    const tableNumber = req.body.tableNumber;

    const isTableOccupied = await Order.findOne({tableNumber});

    if(isTableOccupied){
        return res.status(409).json({
            msg: 'Table is occupied, try with a different tableNumber'
        })
    }

    try{

        let totalAmount = 0;
        for (const item of items){
            totalAmount += item.quantity * item.price
        }

        const order = {
            items,
            totalAmount,
            status,
            customerName,
            tableNumber
        }

        const orderItem = await Order.create(order);
        res.status(201).json({
            msg: "Order created successfully!",
            orderData: orderItem
        })
    }
    catch(e){
        res.status(500).json({
            msg: e.message
        })
    }
};

module.exports = createOrderItem;