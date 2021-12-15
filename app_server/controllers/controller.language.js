var language =require('../models/model.language.js');

// Get Variation By Id
module.exports.getLanguageById = (id ,callback) =>  {
	language.find({_id:id}, callback);
}

// Get All Variation
module.exports.getAllLanguage = (callback) =>  {
	language.find(null,callback);
}

// Add Variation
module.exports.addLanguage = async (menuForm, callback) => {
	language.create(menuForm, callback);
}


// Update Variation
module.exports.updateLanguage = async (menuId, menuForm, options, callback) => {
	var query = {_id: menuId};
	language.findOneAndUpdate(query,menuForm,options, callback);
}



// Delete Variation   
module.exports.removeLanguage = (id, callback) => {
    var query = {_id: id};
    language.remove(query, callback)
}
