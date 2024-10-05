const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    }
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

const addProduct = (productDetails) => {
   const products = new Product(productDetails);
   return products.save();
}


const getProducts = (query) => {
    const productList  = Product.find(query);
    return productList;
}

const editProduct = (query, updateData) => {
   return Product.findOneAndUpdate(query, updateData, {upsert: true});
}

const deleteProduct = (query) => {
   return Product.deleteOne(query);
}


module.exports = {
    addProduct: addProduct,
    getProducts:getProducts,
    editProduct:editProduct,
    deleteProduct:deleteProduct
}
