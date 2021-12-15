var translation =require('../models/model.translation.js');

// Get Variation By Id
module.exports.getTranslationById = (id ,callback) =>  {
	translation.find({_id:id}, callback);
}

// Get All Variation
module.exports.getAllTranslation = (callback) =>  {
	translation.find(null,callback)
    .populate('languageId');
}

// Add Variation
module.exports.addTranslation = async (menuForm, callback) => {
	translation.create(menuForm, callback);
}


// Update Variation
module.exports.updateTranslation = async (menuId, menuForm, options, callback) => {
	var query = {_id: menuId};
	translation.findOneAndUpdate(query,menuForm,options, callback);
}



// Delete Variation   
module.exports.removeTranslation = (id, callback) => {
    var query = {_id: id};
    translation.remove(query, callback)
}
