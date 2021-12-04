var express = require('express');
var router = express.Router();

var item = require('../controllers/controller.item.js');
const mediaUpload = require("../../config/media_upload");

//Add Item
router.post('/add', mediaUpload.fields([
    {
      name: 'item_image', maxCount: 1
    },{
      name: "item_modal", maxCount: 1,
    }
  ]),function (req, res) {
    var itemForm = req.body;

    console.log(itemForm)

    if(req.files.item_image){
        itemForm.item_image = req.files.item_image[0].location;
    }
    if(req.files.item_modal){
        itemForm.item_modal = req.files.item_modal[0].location;
    }

    item.addItem(itemForm  ,function (err, itemResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "item Added successfully",
                status: true, 
                data: itemResult
            });
        }

    });

});


//Get All Items List
router.get('/get_all', function (req, res) {
    item.getAllItems(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Item Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Item Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Get All Items By subCategoryId
router.get('/get_all_by_subcategoryid/:subCategoryId', function (req, res) {
    item.getAllItemBySubCategoryId(req.params.subCategoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Item Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Item Exist with this subCategoryId",
                status: false
            });
        }
        
    });

});


//Get Item By Id
router.get('/get_by_id/:itemId', function (req, res) {
    item.getItemById(req.params.itemId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Item Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Item Exist with this itemId",
                status: false
            });
        }
        
    });

});


//Update Pin Category
router.patch('/update/:itemId', mediaUpload.fields([
    {
      name: 'item_image', maxCount: 1
    },{
      name: "item_modal", maxCount: 1,
    }
  ]),function (req, res) {
    var itemForm = req.body;
    var itemId = req.params.itemId;
    console.log(itemForm)

    if(req.files.item_image){
        itemForm.item_image = req.files.item_image[0].location;
    }
    if(req.files.item_modal){
        itemForm.item_modal = req.files.item_modal[0].location;
    }

    item.updateItem(itemId, itemForm, {new: true}, function (err, itemResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Item Updated successfully",
                status: true, 
                data: itemResult
            });
        }

    });

});


// Remove Item By Id
router.get('/remove_by_id/:itemId', function (req, res) {
    item.removeItem(req.params.itemId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Item Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Item not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;