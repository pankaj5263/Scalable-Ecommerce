import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-neutral-10 shadow-sm sticky top-0 z-50 flex justify-between z-50">
      <div className="container mx-auto px-4 py-4 flex items-center w-1/3">
        
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold text-gray-800"
          whileHover={{ scale: 1.2 }} 
          transition={{ type: 'spring', stiffness: 300 }}
        >
         <Link to={"/"}>Buy Now</Link>
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 mx-12">
          <motion.a
            href="/" className="text-gray-700 hover:text-gray-900"
            whileHover={{ scale: 1.1 }} 
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to={"/"}>Home</Link>
          </motion.a>
          <motion.a
            href="/shop" className="text-gray-700 hover:text-gray-900"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to={"/add-product"}>Add Product</Link>
            
          </motion.a>
        </nav>

      </div>

      <div className="container mx-auto px-4 py-4 items-center flex justify-end">
        {/* User Actions (Cart, Profile) */}
        <div className="flex items-center space-x-4">
          <motion.div  whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Switch/>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Button variant="outline">Cart</Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Button variant="default">Login</Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
