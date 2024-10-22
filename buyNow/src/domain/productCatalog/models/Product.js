class Product {
    constructor({id=false, name, description, price, rating, category, image}) {
      if(id){
        this.id = id;
      }
      
      this.name = name;
      this.description = description;
      this.price = price;
      this.rating = rating;
      this.category = category;
      this.image = image;
    }
  }
  
  export default Product;
  