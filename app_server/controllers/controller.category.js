var category =require('../models/model.category.js');

// Get Category By Id
module.exports.getCategoryById = (id ,callback) =>  {
	category.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllCategories = (langaugeId,callback) =>  {
	category.find({languageId:langaugeId,state:"active"},callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}
module.exports.getAllCategoriesWithoutLangaugeId = (callback) =>  {
	category.find({state:"active"},callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}

module.exports.getAllByLanguageCategory = (langaugeId, categoryId ,callback) =>  {
	category.find({languageId:langaugeId,categoryId:categoryId}, callback)
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
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
