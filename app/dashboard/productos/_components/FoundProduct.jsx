"use client";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

const FoundProduct = ({ products, setProductList, setShow }) => {
  const [product, setProduct] = useState("");

  useEffect(() => {
    let filteredProducts = products;

    if (product) {
      filteredProducts = filteredProducts.filter(item => 
        item.id.toString().includes(product)
      );
    }
    
    setShow(filteredProducts.length > 0);
    setProductList(filteredProducts);
  }, [product]); // Solo estas dependencias

  return (
    <div>
      <div className="flex flex-row items-center space-x-8 px-4 justify-center">
        <Input
          autoFocus={true}
          placeholder="ID de producto"
          type="number"
          className="w-3/8 rounded-lg"
          onChange={(e) => {
            setProduct(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FoundProduct;
