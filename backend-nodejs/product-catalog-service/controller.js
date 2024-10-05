const productModel = require('./model'); 
const {response, errorObject} = require('./utils');

// this will add the Product to the db
const addProduct = async function(req, res, next) {
     try{
        const product = await productModel.addProduct(req.body);
        const addedProductSuccessfully = req.t("addedProductSuccessfully");
        return response({res, statusCode:201, message: addedProductSuccessfully, data:product});
     } catch(error){
        next(error);
     }
}

const editProduct = async function(req, res, next) {
   try{
      const productId = req.params.productId;

      if(!productId){
         const productIdDoesNotExist = req.t("productIdDoesNotExist");
         return errorObject(req, productIdDoesNotExist, 400);
      }
      const product = await productModel.getProducts({_id: productId});
      if(!product){
         const productDoesNotExist = req.t("productDoesNotExist");
         return errorObject(req, productDoesNotExist, 400);
      }
      const productDetails = {
        ...req.body
      }

      const editedProduct = await productModel.editProduct({_id:productId}, productDetails);
      const editedProductSuccessfully = req.t("editedProductSuccessfully");
      return response({res, statusCode:201, message: editedProductSuccessfully, data:editedProduct});
   } catch(error){
     next(error);
   }
}

// this wiil return all the products list
const getProductList = async function(req, res, next) {
  try {
    const product = await productModel.getProducts({});
    const fetchProductSuccessfully = req.t("fetchProductSuccessfully");
    return response({res, statusCode:200, message:fetchProductSuccessfully, data:product});
  } catch (error) {
     next(error);
  }
}

const catagoryProduct = async function(req, res, next) {
   try {
      const catagoryName = req.params.catagory;
      const product = await productModel.getProducts({category: catagoryName});
      const fetchProductSuccessfully = req.t("fetchProductSuccessfully");
      return response({res, statusCode:200, message:fetchProductSuccessfully, data:product});
    } catch (error) {
       next(error);
    }
}

// this will return product details
const productDetails  = async function(req, res, next){
   try{
      const productId = req.params.productId;

      if(!productId){
         const productIdDoesNotExist = req.t("productIdDoesNotExist");
         return errorObject(req, productIdDoesNotExist, 400);
      }
      const product = await productModel.getProducts({_id: productId});
   
      if(!product){
         const productIdDoesNotExist = req.t("productIdDoesNotExist");
         return errorObject(req, productIdDoesNotExist, 400);
      }
      const fetchProductSuccessfully = req.t("fetchProductSuccessfully");
      return response({res, statusCode:200, message:fetchProductSuccessfully, data:product[0]});
   } catch(error){
     next(error);
   }
}


const deleteProduct = async (req, res, next) => {
  try {
   const productId = req.params.productId;
   if(!productId){
      const productIdDoesNotExist = req.t("productIdDoesNotExist");
      return errorObject(req, productIdDoesNotExist, 400);
   }
   const product = await productModel.getProducts({_id: productId});

   if(!product){
      const productIdDoesNotExist = req.t("productIdDoesNotExist");
      return errorObject(req, productIdDoesNotExist, 400);
   }

   const deleteProduct = await productModel.deleteProduct({_id: productId});
   const deleteProductSuccessfully = req.t("deleteProductSuccessfully");
   return response({res, statusCode:200, message:deleteProductSuccessfully, data:deleteProduct});
   
  } catch (error) {
     next(error);
  }
}

module.exports = {
    addProduct: addProduct,
    getProductList: getProductList,
    productDetails: productDetails,
    editProduct:editProduct,
    deleteProduct: deleteProduct,
    catagoryProduct: catagoryProduct
}