var product =require('../models/model.product.js');

// // Get item By Id
module.exports.getProductById = (id ,callback) =>  {
	item.find({_id:id}, callback)
	.populate('categoryId')
    .populate('variationId')
}

// // Get All item By subCategoryId
// module.exports.getAllItemBySubCategoryId = (subCategoryId ,callback) =>  {
// 	item.find({sub_category_id: subCategoryId}, callback)
// 	.populate({path:'sub_category_id', select:[ 'name', 'category_image'],
// 	populate : { path : 'category_id', select:['name']},
// });
// }

// // Get All Items
module.exports.getAllProducts = (callback) =>  {
	product.find(callback)
	.populate('categoryId')
    .populate('variationId')
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
