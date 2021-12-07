var express = require('express');
var router = express.Router();

var variation = require('../controllers/controller.variation.js');
const mediaUpload = require("../../config/media_upload");

//Add variation
router.post('/add', mediaUpload.fields([
    {
      name: 'reference_image', maxCount: 1
    },
    {
        name: 'model_image', maxCount: 1
      }
  ]),function (req, res) {
    var variationForm = req.body;

    if(req.files.reference_image){
        variationForm.reference_image = req.files.reference_image[0].location;
    }
    if(req.files.model_image){
        variationForm.model_image = req.files.model_image[0].location;
    }

    console.log(variationForm);
    variation.addVariation(variationForm  ,function (err, variationResult) {
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
    variation.getAllVariation(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Variation Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Variation Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Variation By Id
router.get('/get_by_id/:variationId', function (req, res) {
    variation.getVariationById(req.params.variationId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "variation Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No variation Exist with this variation",
                status: false
            });
        }
        
    });

});


//Update Variation
router.patch('/update/:variationId', mediaUpload.fields([
    {
        name: 'category_icon', maxCount: 1
      },
      {
          name: 'category_default_image', maxCount: 1
        }
  ]),function (req, res) {
    var variationForm = req.body;
    var variationId = req.params.variationId;

    if(req.files.reference_image){
        variationForm.reference_image = req.files.reference_image[0].location;
    }
    if(req.files.model_image){
        variationForm.model_image = req.files.model_image[0].location;
    }

    variation.updateVariation(variationId, variationForm, {new: true}, function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Variation Updated successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


// Remove variation By Id
router.get('/remove_by_id/:variationId', function (req, res) {
    variation.removeVariation(req.params.variationId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "variation Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "variation not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;