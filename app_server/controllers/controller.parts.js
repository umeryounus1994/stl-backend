var parts =require('../models/model.parts.js');

// Get Category By Id
module.exports.getPartsById = (id ,callback) =>  {
	parts.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllParts = (callback) =>  {
	parts.find({state:"active"},callback)
    .populate('productId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}

module.exports.getAllPartsByProductId = (productId, languageId, categoryId ,callback) =>  {
	parts.find({productId: productId,languageId:languageId,categoryId:categoryId,state:"active"}, callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}



// Add Category
module.exports.addParts = async (categoryForm, callback) => {
	parts.create(categoryForm, callback);
}


// Update Category
module.exports.updateParts = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	parts.findOneAndUpdate(query,categoryForm,options, callback);
}



// Delete Category   
module.exports.removeParts = (id, callback) => {
    var query = {_id: id};
    parts.remove(query, callback)
}
