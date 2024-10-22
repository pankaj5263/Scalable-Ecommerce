import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '../../ui/card';
import { Textarea } from '../../ui/textarea';
import Product from '../../../domain/productCatalog/models/Product';
import ProductRepository from '../../../domain/productCatalog/repositories/ProductRepository';
import ProductService from '../../../domain/productCatalog/services/ProductServices';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../../ui/select';
import apiClient from '../../../api/api';
import {CATEGORY} from "../../../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { wait } from '../../../lib/utils';

const productRepository = new ProductRepository(apiClient);
const productService = new ProductService(productRepository);

const ProductForm = (props) => {
  const [product, setProduct] = useState(new Product({}));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleCategoryChange = (value) => {
    setProduct({ ...product, category: value });
  };

  const handleSubmit = async (e) => {
    try {
    await e.preventDefault();
    const productdata = await productService?.addProduct(new Product(product));
    toast.success(productdata.data.message);
    wait(navigate,"/");
    } catch(e){
      await toast.error('Error: ' + e);
    }
  };

  

  return (
    <>
        <Card className="max-w-lg mx-auto p-2">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h2 className="text-xl font-bold">Create Product</h2>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={product.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={product.price || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="number"
              id="rating"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              value={product.rating || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} defaultValue={product.category}>
              <SelectTrigger>
                <span>{product.category || "Select a category"}</span>
              </SelectTrigger>
              <SelectContent>
                {CATEGORY.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" variant="primary" className="border-2 border-slate-500 border-solid">
            Save Product
          </Button>
        </CardFooter>
      </form>
    </Card>
    <ToastContainer autoClose={3000} />
    </>

  );
};

export default ProductForm;
