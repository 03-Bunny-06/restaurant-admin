const mongoose = require("mongoose");
const Menu = require("../models/menuItemModel");

const getMenuItems = async(req, res) => {
    const category = req.query.category;
    const avaliablity = req.query.avaliablity;
    const price = req.query.price;

    try{
        const hasFilters = !!(category || avaliablity || price)
        console.log(hasFilters);

        let query = Menu.find();
        
        if(hasFilters){
            const filtersData = {};

            if (category){
                filtersData.category = category;
            }

            if (avaliablity){
                filtersData.isAvailable = avaliablity === 'true'
            }

            if(price){
                filtersData.price = {$gte: Number(price)}
            }

            console.log(filtersData);

            query = Menu.find(filtersData);
        }

        let menuItemsData = await query;

        if (menuItemsData.length > 0){
            res.status(200).json({
                filteredData: hasFilters,
                totalMenuItems: menuItemsData.length,
                data: menuItemsData
            })
        }
        else{
            res.status(404).json({
                filteredData: hasFilters,
                msg: 'No data found after filteration'
            })
        }

    }
    catch(e){
        res.status(500).json({
            msg: e.message
        })
    }
};

const getMenuItemById = async(req, res) => {
    const menuItemId = req.params.id;
    const isValid = mongoose.isValidObjectId(menuItemId);

    if(!isValid){
        res.status(404).json({
            msg: "Invalid MenuID (or) MenuID not found!"
        })
    }

    try{
        const menuItemData = await Menu.findById(menuItemId);

        res.status(200).json({
            msg: "Menu item found!",
            menuData: menuItemData
        })
    }
    catch(e){
        res.status(500).json({
            msg: e.message
        })
    }
}

const createMenuItem = async(req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;
    const ingredients = req.body.ingredients;
    const preparationTime = req.body.preparationTime;
    const timeStamps = req.body.timestamps;
    try{
        const itemExists = await Menu.findOne({
            name,
            category
        })
        if(itemExists === null){
            const menuItem = await Menu.create({
                name,
                description,
                category,
                price,
                ingredients,
                preparationTime,
                timeStamps
            })
            //201 - Created
            res.status(201).json({
                msg: "Menu item created Successfully!",
                data: menuItem
            })
        }
        else{
            //409 - Conflict
            res.status(409).json({
                msg: `Name: ${name} in Category: ${category} already exists!`,
            })   
        }
    }
    catch(er){
        res.status(500).json({
            error: er.message
        })
    }
}

module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem
};