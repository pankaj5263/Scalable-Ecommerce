import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Enum } from "../../../enums/enum";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProductCard(props) {
  const { id, description, name, price, rating } = props;
  return (
    <div>
      <motion.div
        className="relative bg-white shadow-lg rounded-lg overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: "300px", height: "200px" }}
      >
        <Card className="w-[300px]">
          <Link to={`product-details/${id}`}>
            <CardHeader>{/* Here i will place image */}</CardHeader>
            <CardContent>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {Enum.DESCRIPTION}: {description}
              </CardDescription>
              <CardDescription>
                {Enum.PRICE}: {price}
              </CardDescription>
              <CardDescription>
                {Enum.RATING}: {rating}
              </CardDescription>
            </CardContent>
          </Link>

          <CardFooter className="flex justify-between">
            <Button variant="outline">{Enum.BUY_NOW}</Button>
            <Button>{Enum.ADD_TO_CART}</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default ProductCard;
