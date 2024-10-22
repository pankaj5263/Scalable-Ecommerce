import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Enum } from '../enums/enum';


const ProductDetails = () => {
  const { productId } = useParams();

  const product = {
    id: productId,
    name: "Awesome Product",
    description: "This is an amazing product that has great features.",
    price: "99.99",
    rating: "4.5/5",
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          {product.name}
        </CardHeader>
        <CardContent>
          <div variant="body1">{Enum.DESCRIPTION} {product.description}</div>
          <div variant="body2" className="mt-2">
            {Enum.PRICE}: &#8377; {product.price}
          </div>
          <div variant="body2" className="mt-1">
            {Enum.RATING}: {product.rating}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="mr-2">
            {Enum.ADD_TO_CART}
          </Button>
          <Button variant="secondary">{Enum.BUY_NOW}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetails;
