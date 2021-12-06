var variation =require('../models/model.variation.js');

// Get Category By Id
module.exports.getCategoryById = (id ,callback) =>  {
	variation.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllCategories = (callback) =>  {
	variation.find({state:"active"},callback);
}

// Add Category
module.exports.addVariation = async (variationForm, callback) => {
	variation.create(variationForm, callback);
}


// Update Category
module.exports.updateCategory = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	variation.findOneAndUpdate(query,categoryForm,options, callback);
}



// Delete Category   
module.exports.removeCategory = (id, callback) => {
    var query = {_id: id};
    variation.remove(query, callback)
}
