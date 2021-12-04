var express = require('express');
var router = express.Router();

var subCategory = require('../controllers/controller.sub_category.js');
const mediaUpload = require("../../config/media_upload");

//Add subCategory
router.post('/add', mediaUpload.fields([
    {
      name: 'sub_category_image', maxCount: 1
    }
  ]),function (req, res) {
    var subCategoryForm = req.body;

    console.log(subCategoryForm)

    if(req.files.sub_category_image){
        subCategoryForm.sub_category_image = req.files.sub_category_image[0].location;
    }

    subCategory.addSubCategory(subCategoryForm  ,function (err, subCategoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "subCategory Added successfully",
                status: true, 
                data: subCategoryResult
            });
        }

    });

});


//Get All subCategorys List
router.get('/get_all', function (req, res) {
    subCategory.getAllSubCategories(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "subCategory Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No subCategory Exist",
                status: false,
                data: result
            });
        }
        
    });

});


//Get All subCategorys List
router.get('/get_all_by_category/:categoryId', function (req, res) {
    subCategory.getAllSubCategoriesByCategoryId(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "subCategory Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No subCategory Exist with this categoryId",
                status: false,
                data: result
            });
        }
        
    });

});


//Get subCategory By Id
router.get('/get_by_id/:subCategoryId', function (req, res) {
    subCategory.getSubCategoryById(req.params.subCategoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "subCategory Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No subCategory Exist with this subCategoryId",
                status: false
            });
        }
        
    });

});


//Update Pin subCategory
router.patch('/update/:subCategoryId', mediaUpload.fields([
    {
      name: 'sub_category_image', maxCount: 1
    }
  ]),function (req, res) {
    var subCategoryForm = req.body;
    var subCategoryId = req.params.subCategoryId;
    console.log(subCategoryForm)

    if(req.files.sub_category_image){
        subCategoryForm.sub_category_image = req.files.sub_category_image[0].location;
    }

    subCategory.updateSubCategory(subCategoryId, subCategoryForm, {new: true}, function (err, subCategoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "subCategory Updated successfully",
                status: true, 
                data: subCategoryResult
            });
        }

    });

});


// Remove subCategory By Id
router.get('/remove_by_id/:subCategoryId', function (req, res) {
    subCategory.removeSubCategory(req.params.subCategoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "subCategory Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "subCategory not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;