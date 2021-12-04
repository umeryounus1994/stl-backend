var category =require('../models/model.category.js');

// Get Category By Id
module.exports.getCategoryById = (id ,callback) =>  {
	category.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllCategories = (callback) =>  {
	category.find({state:"active"},callback);
}

// Add Category
module.exports.addCategory = async (categoryForm, callback) => {
	category.create(categoryForm, callback);
}


// Update Category
module.exports.updateCategory = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	category.findOneAndUpdate(query,categoryForm,options, callback);
}



// Delete Category   
module.exports.removeCategory = (id, callback) => {
    var query = {_id: id};
    category.remove(query, callback)
}
