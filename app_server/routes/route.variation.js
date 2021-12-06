var express = require('express');
var router = express.Router();

var variation = require('../controllers/controller.variation.js');
const mediaUpload = require("../../config/media_upload");

//Add category
router.post('/add', mediaUpload.fields([
    {
      name: 'reference_image', maxCount: 1
    },
    {
        name: 'model_image', maxCount: 1
      }
  ]),function (req, res) {
    var variationForm = req.body;

    console.log(variationForm)

    if(req.files.reference_image){
        variationForm.reference_image = req.files.reference_image[0].location;
    }
    if(req.files.model_image){
        variationForm.model_image = req.files.model_image[0].location;
    }

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


//Get All categorys List
router.get('/get_all', function (req, res) {
    variation.getAllCategories(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "category Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Category Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Category By Id
router.get('/get_by_id/:categoryId', function (req, res) {
    variation.getCategoryById(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "category Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No category Exist with this categoryId",
                status: false
            });
        }
        
    });

});


//Update Pin Category
router.patch('/update/:categoryId', mediaUpload.fields([
    {
        name: 'category_icon', maxCount: 1
      },
      {
          name: 'category_default_image', maxCount: 1
        }
  ]),function (req, res) {
    var categoryForm = req.body;
    var categoryId = req.params.categoryId;
    console.log(categoryForm)

    if(req.files.category_icon){
        categoryForm.category_icon = req.files.category_icon[0].location;
    }
    if(req.files.category_default_image){
        categoryForm.category_default_image = req.files.category_default_image[0].location;
    }

    variation.updateCategory(categoryId, categoryForm, {new: true}, function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "category Updated successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});


// Remove category By Id
router.get('/remove_by_id/:categoryId', function (req, res) {
    variation.removecategory(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "category Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "category not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;