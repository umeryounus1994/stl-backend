var menu =require('../models/model.menu.js');

// Get Variation By Id
module.exports.getMenuById = (id ,callback) =>  {
	menu.find({_id:id}, callback);
}

// Get All Variation
module.exports.getAllMenu = (callback) =>  {
	menu.find({state:"active"},callback);
}

// Add Variation
module.exports.addMenu = async (menuForm, callback) => {
	menu.create(menuForm, callback);
}


// Update Variation
module.exports.updateMenu = async (menuId, menuForm, options, callback) => {
	var query = {_id: menuId};
	menu.findOneAndUpdate(query,menuForm,options, callback);
}



// Delete Variation   
module.exports.removeMenu = (id, callback) => {
    var query = {_id: id};
    menu.remove(query, callback)
}
