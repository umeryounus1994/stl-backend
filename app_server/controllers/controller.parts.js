var parts =require('../models/model.parts.js');

// Get Category By Id
module.exports.getPartsById = (id ,callback) =>  {
	parts.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllParts = (callback) =>  {
	parts.find(callback)
    .populate('productId');
}

module.exports.getAllPartsByProductId = (productId ,callback) =>  {
	parts.find({productId: productId}, callback);
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
