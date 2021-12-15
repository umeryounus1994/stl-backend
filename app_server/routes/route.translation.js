var express = require('express');
var router = express.Router();
const multer = require('multer');
var translation = require('../controllers/controller.translation.js');
const mediaUpload = require("../../config/media_upload");


//Add variation
router.post('/add', async function (req, res) {
    var languageForm = req.body;
    
    translation.addTranslation(languageForm  ,function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Translation Added successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


//Get All Variation List
router.get('/get_all', function (req, res) {
    translation.getAllTranslation(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Translation Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Translation Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Variation By Id
router.get('/get_by_id/:translationId', function (req, res) {
    translation.getTranslationById(req.params.translationId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Translation Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Translation Exist with this Id",
                status: false
            });
        }
        
    });

});


//Update Variation
router.patch('/update/:translationId',function (req, res) {
    translation.updateTranslation(req.params.translationId, req.body, {new: true}, function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
            return res.json({
                message: "Variation Updated successfully",
                status: true, 
                data: variationResult
            });
        
    });

});


router.get('/remove_by_id/:translationId', function (req, res) {
    language.removeLanguage(req.params.translationId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Language Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Language not removed",
                status: false
            });
        }
        
    });

});



module.exports = router;