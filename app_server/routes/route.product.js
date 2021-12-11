var express = require('express');
var router = express.Router();

var product = require('../controllers/controller.product.js');
const mediaUpload = require("../../config/media_upload");
const vuforiaUpload = require("../../config/vuforia_client");
const fs = require('fs');
const https = require('https');
//Add Item
router.post('/add', mediaUpload.fields([
    {
      name: 'model', maxCount: 1
    }
  ]),async function (req, res) {
    var productForm = req.body;
    if(req.files.model){
    var fileName =req.files.model[0].originalname;
    await getRemoteFile('./images/'+fileName,req.files.model[0].location);
    
    let respp = await vuforiaUpload('./images/'+fileName,50,'file desc is here');
    if(respp == "TargetNameExist"){
        return res.status(500).json({
            message: "Target with same name exist",
            status: false
        });
    }
    if(respp == "BadImage"){
        return res.status(500).json({
            message: "Bad Target Image",
            status: false
        });
    }
    if(respp == "Failed"){
        return res.status(500).json({
            message: "Failed to Upload Image to vuforia",
            status: false
        });
    }
        productForm.model = req.files.model[0].location;
        productForm.targetId = respp.targetId;
        productForm.targetName = respp.targetName;
    }
    product.addProduct(productForm  ,function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Product Added successfully",
                status: true, 
                data: result
            });
        }
    });
});


// //Get All Items List
router.get('/get_all', function (req, res) {
    product.getAllProducts(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Product Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Product Exist",
                status: false,
                data: result
            });
        }
        
    });

});


// //Get All Items By subCategoryId
router.get('/get_all_by_categoryid/:CategoryId', function (req, res) {
    product.getAllProductsByCategoryId(req.params.CategoryId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Product Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Product Exist with this CategoryId",
                status: false
            });
        }
        
    });

});


// //Get Item By Id
router.get('/get_by_id/:productId', function (req, res) {
    product.getProductById(req.params.productId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Product Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Product Exist with this Product Id",
                status: false
            });
        }
        
    });

});


//Update Pin Category
router.patch('/update/:productId',  mediaUpload.fields([
    {
      name: 'model', maxCount: 1
    }
  ]),async function (req, res) {
    var productForm = req.body;
    var productId = req.params.productId;
    if(req.files.model){
    var fileName =req.files.model[0].originalname;
    await getRemoteFile('./images/'+fileName,req.files.model[0].location);
    
    let respp = await vuforiaUpload('./images/'+fileName,50,'file desc is here');
    if(respp == "TargetNameExist"){
        return res.status(500).json({
            message: "Target with same name exist",
            status: false
        });
    }
    if(respp == "BadImage"){
        return res.status(500).json({
            message: "Bad Target Image",
            status: false
        });
    }
    if(respp == "Failed"){
        return res.status(500).json({
            message: "Failed to Upload Image to vuforia",
            status: false
        });
    }
        productForm.model = req.files.model[0].location;
        productForm.targetId = respp.targetId;
        productForm.targetName = respp.targetName;
    }

    product.updateProduct(productId, productForm, {new: true}, function (err, itemResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "Product Updated successfully",
                status: true, 
                data: itemResult
            });
        }

    });

});


// Remove Item By Id
router.get('/remove_by_id/:productId', function (req, res) {
    product.removeProduct(req.params.productId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "Product Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "Product not removed",
                status: false
            });
        }
        
    });

});
async function getRemoteFile(file, url) {
    let localFile = fs.createWriteStream(file);
    await new Promise((resolve, reject) => {
        const request = https.get(url, function(response) {
            var len = parseInt(response.headers['content-length'], 10);
            var cur = 0;
            var total = len / 1048576; //1048576 - bytes in 1 Megabyte
    
            response.on('data', function(chunk) {
                cur += chunk.length;
                showProgress(file, cur, len, total);
            });
    
            response.on('end', function() {
                console.log("Download complete");
                resolve('done');
            });
    
            response.pipe(localFile);
        });
    })

}

function showProgress(file, cur, len, total) {
    console.log("Downloading " + file + " - " + (100.0 * cur / len).toFixed(2) 
        + "% (" + (cur / 1048576).toFixed(2) + " MB) of total size: " 
        + total.toFixed(2) + " MB");
}

module.exports = router;