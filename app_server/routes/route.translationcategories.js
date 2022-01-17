var express = require('express');
var router = express.Router();

var translationcategories = require('../controllers/controller.translationcategories.js');

//Add category
router.post('/add',function (req, res) {
    var categoryForm = req.body;
    translationcategories.addCategory(categoryForm  ,function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Category Added successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});


//Get All categorys List
router.get('/get_all', function (req, res) {
    translationcategories.getAllCategory(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Category Exist",
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




//Update Pin Category
router.post('/update/',function (req, res) {
    var categoryForm = req.body;
    console.log(categoryForm);

    translationcategories.updateCategory(categoryForm.categoryId, categoryForm, function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Category Updated successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});


// Remove category By Id
router.get('/remove_by_id/:categoryId', function (req, res) {
    translationcategories.removeCategory(req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Category Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Category not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;