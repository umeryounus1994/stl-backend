var variation =require('../models/model.variation.js');

// Get Variation By Id
module.exports.getVariationById = (id ,callback) =>  {
	variation.find({_id:id}, callback);
}

// Get All Variation
module.exports.getAllVariation = (callback) =>  {
	variation.find({state:"active"},callback)
	.populate('languageId')
	.populate('categoryId','name');
}

module.exports.getAllByLanguageCategory = (langaugeId, categoryId ,callback) =>  {
	variation.find({languageId:langaugeId,categoryId:categoryId}, callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}
// Add Variation
module.exports.addVariation = async (variationForm, callback) => {
	variation.create(variationForm, callback);
}


// Update Variation
module.exports.updateVariation = async (variationId, variationForm, options, callback) => {
	var query = {_id: variationId};
	variation.findOneAndUpdate(query,variationForm,options, callback);
}



// Delete Variation   
module.exports.removeVariation = (id, callback) => {
    var query = {_id: id};
    variation.remove(query, callback)
}
