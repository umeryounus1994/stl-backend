var subCategory =require('../models/model.sub_category.js');

// Get subCategory By Id
module.exports.getSubCategoryById = (id ,callback) =>  {
	subCategory.find({_id:id}, callback)
	.populate({path:'category_id', select:[ 'name', 'category_image']});
}

// Get All Sub Categories
module.exports.getAllSubCategories = (callback) =>  {
	subCategory.find(callback)
	.populate({path:'category_id', select:[ 'name', 'category_image']});
}

// Get All Sub Categories By CategoryId
module.exports.getAllSubCategoriesByCategoryId = (categoryId, callback) =>  {
	subCategory.find({category_id: categoryId},callback)
	.populate({path:'category_id', select:[ 'name', 'category_image']});
}

// Add subCategory
module.exports.addSubCategory = async (subCategoryForm, callback) => {
	subCategory.create(subCategoryForm, callback);
}


// Update subCategory
module.exports.updateSubCategory = async (subCategoryId, subCategoryForm, options, callback) => {
	var query = {_id: subCategoryId};
	subCategory.findOneAndUpdate(query,subCategoryForm,options, callback);
}



// Delete subCategory   
module.exports.removeSubCategory = (id, callback) => {
    var query = {_id: id};
    subCategory.remove(query, callback)
}
