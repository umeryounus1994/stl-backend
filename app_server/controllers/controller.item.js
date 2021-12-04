var item =require('../models/model.item.js');

// Get item By Id
module.exports.getItemById = (id ,callback) =>  {
	item.find({_id:id}, callback)
	.populate({path:'sub_category_id', select:[ 'name', 'category_image'],
	populate : { path : 'category_id', select:['name']},
});
}

// Get All item By subCategoryId
module.exports.getAllItemBySubCategoryId = (subCategoryId ,callback) =>  {
	item.find({sub_category_id: subCategoryId}, callback)
	.populate({path:'sub_category_id', select:[ 'name', 'category_image'],
	populate : { path : 'category_id', select:['name']},
});
}

// Get All Items
module.exports.getAllItems = (callback) =>  {
	item.find(callback)
	.populate({path:'sub_category_id', select:[ 'name', 'category_image'],
	populate : { path : 'category_id', select:['name']},
});
}

// Add item
module.exports.addItem = async (itemForm, callback) => {
	item.create(itemForm, callback);
}


// Update item
module.exports.updateItem = async (itemId, itemForm, options, callback) => {
	var query = {_id: itemId};
	item.findOneAndUpdate(query,itemForm,options, callback);
}



// Delete item   
module.exports.removeItem = (id, callback) => {
    var query = {_id: id};
    item.remove(query, callback)
}
