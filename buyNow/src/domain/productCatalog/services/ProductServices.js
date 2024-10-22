class ProductService {
    constructor(productRepository) {
      this.productRepository = productRepository;
    }
  
    async listAllProducts() {
      return await this.productRepository.fetchAllProducts();
    }

    async addProduct(product){
        try{
          const data = await this.productRepository.addProduct(product);
          console.log("product services=", data);
          return data;
        } catch(e){
          console.error("Product added failed", e);
        }
        
    }
  }
  
  export default ProductService;
  