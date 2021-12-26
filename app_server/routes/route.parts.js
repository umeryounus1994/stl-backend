var express = require('express');
var router = express.Router();

var parts = require('../controllers/controller.parts.js');
const mediaUpload = require("../../config/media_upload");

//Add category
router.post('/add', mediaUpload.fields([
    {
      name: 'imageFile', maxCount: 1
    }
  ]),function (req, res) {
    var categoryForm = req.body;


    if(req.files.imageFile){
        categoryForm.imageFile = req.files.imageFile[0].location;
    }
    parts.addParts(categoryForm  ,function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Part Added successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});

router.get('/get_all_by_productId/:productId', function (req, res) {
    parts.getAllPartsByProductId(req.params.productId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Part Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Part Exist with this ProductId",
                status: false
            });
        }
        
    });

});


//Get All categorys List
router.get('/get_all', function (req, res) {
    parts.getAllParts(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Parts Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Parts Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Category By Id
router.get('/get_by_id/:partsId', function (req, res) {
    parts.getPartsById(req.params.partsId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Parts Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Parts Exist with this partId",
                status: false
            });
        }
        
    });

});


//Update Pin Category
router.patch('/update/:partsId', mediaUpload.fields([
    {
        name: 'imageFile', maxCount: 1
      }
  ]),function (req, res) {
    var categoryForm = req.body;
    var partsId = req.params.partsId;

    if(req.files.imageFile){
        categoryForm.imageFile = req.files.imageFile[0].location;
    }

    parts.updateParts(partsId, categoryForm, {new: true}, function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Part Updated successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});


// Remove category By Id
router.get('/remove_by_id/:partsId', function (req, res) {
    parts.removeParts(req.params.partsId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "parts Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "parts not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;