const mongoose = require("mongoose");
const Order = require("../models/orderModel");

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

const getOrderItems = async(req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let status = req.query.status;

    const hasFilters = !!(page || limit || status);
    console.log(hasFilters);

    let pageNum, limitNum, totalOrders, totalPages;

    try{
        filter = {}

        const hasPagination = !!(page || limit);
        const hasFilter = typeof(status) === "string";

        if(hasFilter){
            filter.status = status;
        }

        query = Order.find(filter);

        if(hasPagination){
            pageNum = Math.max(1, Number(page));
            limitNum = Math.max(5, Number(limit));

            totalOrders = await Order.countDocuments({});
            totalPages = Math.ceil(totalOrders/limitNum);

            const skipNum = (pageNum - 1) * limitNum;

            if(pageNum > totalPages && totalOrders > 0){
                return res.status(404).json({
                    msg: "Page does not exist!"
                })
            }

            query.skip(skipNum).limit(limitNum)
        }

        const data = await query;

        res.status(200).json({
            hasFilter: hasFilter,
            hasPagination: hasPagination,
            totalOrders: totalOrders,
            ...(hasPagination && {
                totalPages: totalPages,
                currentPage: pageNum,
                limit: limitNum
            }),
            data: data
        })
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
}

const getOrderItemById = async(req, res) => {
    const orderId = req.params.id;
    const isValid = mongoose.isValidObjectId(orderId);

    if(!isValid){
        return res.status(404).json({
            msg: "Invalid Order ID (or) Order ID not found!"
        })
    }

    try{
        const orderDetails = await Order.findById(orderId).populate("items.menuItem");

        if(!orderDetails){
            return res.status(404).json({
                msg: "Order item not found!"
            })
        }

        res.status(200).json({
            msg: "Order item found successfully!",
            orderDetails: orderDetails
        })
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports = {
    getOrderItems,
    getOrderItemById,
    createOrderItem
};