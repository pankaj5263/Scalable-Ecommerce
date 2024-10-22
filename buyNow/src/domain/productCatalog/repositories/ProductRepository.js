import Product from "../models/Product";
class ProductRepository {
    constructor(apiClient) {
      this.apiClient = apiClient;
    }
  
    async fetchAllProducts() {
      const response = await this.apiClient.get('/products');
      return response?.data?.data.map(
        (productData) =>
          new Product({id:productData._id, name:productData.name, description:productData.description, price:productData.price, rating:productData.rating})
      );
    }

    async addProduct(product){
      return await this.apiClient.post('/add-product', product);
    }
  }
  
  export default ProductRepository;
  