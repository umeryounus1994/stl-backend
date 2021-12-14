var express = require('express');
var router = express.Router();
const multer = require('multer');
var language = require('../controllers/controller.language.js');
const mediaUpload = require("../../config/media_upload");


//Add variation
router.post('/add',mediaUpload.fields([
    {
      name: 'logo', maxCount: 1
    }
  ]), async function (req, res) {
    var languageForm = req.body;
    if(req.files.logo){
        languageForm.logo = req.files.logo[0].location;
    }
    language.addLanguage(languageForm  ,function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Language Added successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


//Get All Variation List
router.get('/get_all', function (req, res) {
    language.getAllLanguage(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Language Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Language Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Variation By Id
router.get('/get_by_id/:languageId', function (req, res) {
    language.getLanguageById(req.params.languageId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Language Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Language Exist with this Id",
                status: false
            });
        }
        
    });

});


//Update Variation
router.patch('/update/:languageId', mediaUpload.fields([
    {
        name: 'logo', maxCount: 1
      }
  ]),function (req, res) {
    var languageForm = req.body;
    var companyId = req.params.companyId;

    if(req.files.logo){
        languageForm.logo = req.files.logo[0].location;
    }

    language.updateLanguage(companyId, languageForm, {new: true}, function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Language Updated successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


// Remove variation By Id
router.get('/remove_by_id/:languageId', function (req, res) {
    language.removeLanguage(req.params.languageId, function (err, result) {
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
                message: "Company not removed",
                status: false
            });
        }
        
    });

});



module.exports = router;