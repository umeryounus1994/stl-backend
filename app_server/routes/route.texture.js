var express = require('express');
var router = express.Router();

var texture = require('../controllers/controller.texture.js');
const mediaUpload = require("../../config/media_upload");

//Add category
router.post('/add', mediaUpload.fields([
    {
      name: 'textureFiles', maxCount: 20
    }
  ]),function (req, res) {
    var categoryForm = req.body;
    var textureFiles = [];
    req.files.textureFiles.forEach((element) => {
        var obj = {};
        obj["imagePath"] = element.location;
        textureFiles.push(obj);
      });
    categoryForm.textureFiles = textureFiles;
    texture.addTexture(categoryForm  ,function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Textures Added successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});

router.get('/get_textures_by_partsId/:partsId/:languageId/:categoryId', function (req, res) {
    texture.getAllTexturesByPartsId(req.params.partsId,
        req.params.languageId,
        req.params.categoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Texture Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Texture Exist with this Part ID",
                status: false
            });
        }
        
    });

});


//Get All categorys List
router.get('/get_all', function (req, res) {
    texture.getAllTextures(function (err, result) {
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
router.get('/get_by_id/:textureId', function (req, res) {
    texture.getTextureById(req.params.textureId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Texture Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Texture Exist with this textureId",
                status: false
            });
        }
        
    });

});


//Update Pin Category
router.patch('/update/:textureId', mediaUpload.fields([
    {
        name: 'imageFile', maxCount: 1
      }
  ]),function (req, res) {
    var categoryForm = req.body;
    var textureId = req.params.textureId;

    if(req.files.imageFile){
        categoryForm.imageFile = req.files.imageFile[0].location;
    }

    texture.updateTexture(textureId, categoryForm, {new: true}, function (err, categoryResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Texture Updated successfully",
                status: true, 
                data: categoryResult
            });
        }

    });

});


// Remove category By Id
router.get('/remove_by_id/:textureId', function (req, res) {
    texture.removeTexture(req.params.textureId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Texture Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Texture not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;