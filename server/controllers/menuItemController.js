const Menu = require("../models/menuItemModel");

const createMenuItem = async(req, res) => {
    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const isAvailable = req.body.isAvailable;
    const timeStamps = req.body.timestamps;
    try{
        const itemExists = await Menu.findOne({
            name,
            category
        })
        if(itemExists === null){
            const menuItem = await Menu.create({
                name,
                category,
                price,
                isAvailable,
                timeStamps
            })
            res.status(201).json({
                msg: "Menu item created Successfully!",
                data: menuItem
            })
        }
        else{
            res.status(409).json({
                msg: `Name: ${name} in Category: ${category} already exists!`,
            })   
        }
    }
    catch(er){
        res.status(400).json({
            error: er.message
        })
    }
}

module.exports = createMenuItem;