var translationcategories =require('../models/model.translationcategories.js');


// Get All Categories
module.exports.getAllCategory = (callback) =>  {
	translationcategories.find({state:"active"},callback);
}

// Add Category
module.exports.addCategory = async (categoryForm, callback) => {
	translationcategories.create(categoryForm, callback);
}


// Update Category
module.exports.updateCategory = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	translationcategories.findOneAndUpdate(query,categoryForm,options, callback);
}



// Delete Category   
module.exports.removeCategory = (id, callback) => {
    var query = {_id: id};
    translationcategories.remove(query, callback)
}
