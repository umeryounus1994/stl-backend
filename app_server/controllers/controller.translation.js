var translation =require('../models/model.translation.js');

// Get Variation By Id
module.exports.getTranslationById = (id ,callback) =>  {
	translation.find({_id:id}, callback);
}

module.exports.getAllTranslationByLanguageCategory = (langaugeId, categoryId ,callback) =>  {
	translation.find({languageId:langaugeId,categoryId:categoryId}, callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}

// Get All Variation
module.exports.getAllTranslation = (callback) =>  {
	translation.find(null,callback)
    .populate('languageId')
	.populate('categoryId','name');
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
