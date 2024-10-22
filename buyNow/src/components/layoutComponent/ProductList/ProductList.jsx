import React, { useState, useEffect } from 'react';
import ProductService from '../../../domain/productCatalog/services/ProductServices';
import ProductRepository from '../../../domain/productCatalog/repositories/ProductRepository';
import ProductCard from '../ProducrCard/ProductCard';
import apiClient from "../../../api/api";

const productRepository = new ProductRepository(apiClient);
const productService = new ProductService(productRepository);

function ProductListComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(productService){
      async function loadProducts() {
        const productList = await productService.listAllProducts();
        setProducts(productList);
      }
  
      loadProducts();
    }

  }, []);

  return (
    <div className='flex justify-evenly flex-wrap p-8'>
        {products.map((product, index) => (
            <ProductCard {...product}/>
        ))}      
    </div>
  );
}

export default ProductListComponent;

