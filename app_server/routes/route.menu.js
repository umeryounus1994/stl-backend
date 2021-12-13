var express = require('express');
var router = express.Router();
const multer = require('multer');
var menu = require('../controllers/controller.menu.js');
const mediaUpload = require("../../config/media_upload");


//Add variation
router.post('/add',mediaUpload.fields([
    {
      name: 'icon', maxCount: 1
    },
    {
        name: 'downRightConfirmBtnIcon', maxCount: 1
      }
  ]), async function (req, res) {
    var menuForm = req.body;
    if(req.files.icon){
        menuForm.icon = req.files.icon[0].location;
    }
    if(req.files.downRightConfirmBtnIcon){
        menuForm.downRightConfirmBtnIcon = req.files.downRightConfirmBtnIcon[0].location;
    }
    menu.addMenu(menuForm  ,function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Variation Added successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


//Get All Variation List
router.get('/get_all', function (req, res) {
    menu.getAllMenu(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Menu Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Menu Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Variation By Id
router.get('/get_by_id/:menuId', function (req, res) {
    menu.getMenuById(req.params.menuId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Menu Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Menu Exist with this Id",
                status: false
            });
        }
        
    });

});


//Update Variation
router.patch('/update/:menuId', mediaUpload.fields([
    {
        name: 'icon', maxCount: 1
      },
      {
          name: 'downRightConfirmBtnIcon', maxCount: 1
        }
  ]),function (req, res) {
    var menuForm = req.body;
    var menuId = req.params.menuId;

    if(req.files.icon){
        menuForm.icon = req.files.icon[0].location;
    }
    if(req.files.downRightConfirmBtnIcon){
        menuForm.downRightConfirmBtnIcon = req.files.downRightConfirmBtnIcon[0].location;
    }

    menu.updateMenu(menuId, menuForm, {new: true}, function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Menu Updated successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


// Remove variation By Id
router.get('/remove_by_id/:menuId', function (req, res) {
    menu.removeMenu(req.params.menuId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Menu Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Menu not removed",
                status: false
            });
        }
        
    });

});



module.exports = router;