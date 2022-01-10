var product =require('../models/model.product.js');

// // Get item By Id
module.exports.getProductById = (id,languageId,langCatId ,callback) =>  {
	product.find({_id:id,languageId:languageId,languageCategoryId:langCatId}, callback)
	.populate('categoryId')
    .populate('variationId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('languageCategoryId','name');
}

// // Get All item By subCategoryId
module.exports.getAllProductsByCategoryId = (CategoryId,languageId,langCatId,callback) =>  {
	product.find({categoryId: CategoryId,languageId:languageId,languageCategoryId:langCatId}, callback)
	.populate('categoryId')
    .populate('variationId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('languageCategoryId','name');
}

module.exports.getAllByLanguageCategory = (langaugeId, categoryId ,callback) =>  {
	product.find({languageId:langaugeId,languageCategoryId:categoryId}, callback)
	.populate('categoryId')
    .populate('variationId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('languageCategoryId','name');
}

// // Get All Items
module.exports.getAllProducts = (callback) =>  {
	product.find(callback)
	.populate('categoryId')
    .populate('variationId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('languageCategoryId','name');
}

// Add item
module.exports.addProduct = async (productForm, callback) => {
	product.create(productForm, callback);
}


// Update item
module.exports.updateProduct = async (productId, itemForm, options, callback) => {
	var query = {_id: productId};
	product.findOneAndUpdate(query,itemForm,options, callback);
}



// Delete item   
module.exports.removeProduct = (id, callback) => {
    var query = {_id: id};
    product.remove(query, callback)
}
