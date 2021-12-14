var express = require('express');
var router = express.Router();
const multer = require('multer');
var company = require('../controllers/controller.company.js');
const mediaUpload = require("../../config/media_upload");


//Add variation
router.post('/add',mediaUpload.fields([
    {
      name: 'logo', maxCount: 1
    }
  ]), async function (req, res) {
    var companyForm = req.body;
    if(req.files.logo){
        companyForm.logo = req.files.logo[0].location;
    }
    company.addCompany(companyForm  ,function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Company Added successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


//Get All Variation List
router.get('/get_all', function (req, res) {
    company.getAllCompany(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Company Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Company Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get Variation By Id
router.get('/get_by_id/:companyId', function (req, res) {
    company.getCompanyById(req.params.companyId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Company Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Company Exist with this Id",
                status: false
            });
        }
        
    });

});


//Update Variation
router.patch('/update/:companyId', mediaUpload.fields([
    {
        name: 'logo', maxCount: 1
      }
  ]),function (req, res) {
    var companyForm = req.body;
    var companyId = req.params.companyId;

    if(req.files.logo){
        companyForm.logo = req.files.logo[0].location;
    }

    company.updateCompany(companyId, companyForm, {new: true}, function (err, variationResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Company Updated successfully",
                status: true, 
                data: variationResult
            });
        }

    });

});


// Remove variation By Id
router.get('/remove_by_id/:companyId', function (req, res) {
    company.removeCompany(req.params.companyId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Company Removed",
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