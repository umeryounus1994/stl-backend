var express = require('express');
var router = express.Router();


var admin = require('../controllers/controller.admin.js');



//Add Admin
router.post('/signup_Admin', function (req, res) {
    var adminform = req.body;
    admin.addAdmin(adminform, function (err, admin) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        var result = admin.toObject();
        result.status = true;
        return res.json(result);
    });

});



//Login for Admin
router.post('/loginAdmin', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    admin.login(email, password, res);
});



// Update Admin Password
router.patch('/update_password/:id', function (req, res) {
    var adminId = req.params.id;
    var adminform = req.body;
    console.log(adminform)
    console.log(adminId)
    admin.updateAdmin(adminId, adminform, {new: true}, function (err, adminResult) {
        console.log(adminResult)
        if (err) {
            console.log(err);
            return res.status(500).json({
                Message: "Error in Connecting to DB",
                status: false
            });
        }
        return res.json({
            status: true, 
            message:"password updated successfully",
            data: adminResult
        });

    });
});

module.exports = router;
