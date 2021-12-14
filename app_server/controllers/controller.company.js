var company =require('../models/model.company.js');

// Get Variation By Id
module.exports.getCompanyById = (id ,callback) =>  {
	company.find({_id:id}, callback);
}

// Get All Variation
module.exports.getAllCompany = (callback) =>  {
	company.find({state:"active"},callback);
}

// Add Variation
module.exports.addCompany = async (menuForm, callback) => {
	company.create(menuForm, callback);
}


// Update Variation
module.exports.updateCompany = async (menuId, menuForm, options, callback) => {
	var query = {_id: menuId};
	company.findOneAndUpdate(query,menuForm,options, callback);
}



// Delete Variation   
module.exports.removeCompany = (id, callback) => {
    var query = {_id: id};
    company.remove(query, callback)
}
