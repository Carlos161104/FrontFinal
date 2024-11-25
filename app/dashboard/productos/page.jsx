"use client";
import React, { useState, useEffect } from "react";
import FoundProduct from "./_components/FoundProduct";
import { API_URL } from "@/constants"
import ProductList from "./_components/ProductList";
import CreateProduct from "./CreateProduct";
import FormCreateProduct from "./FormCreateProduct";

export default function ProductsPage() {

    const [productList, setProductList] = useState([]);
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);

    const [productId, setProductId] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${API_URL}/products`);
            const products = await response.json();
            setProductList(products);
            setProducts(products);
        };

        fetchProducts();
    }, []);

    // Aqui lo que se tiene que hacer son las peticiones a la API para obtener las ordenes
    return (
        <div className="flex flex-col w-11/12">
            <div className="w-8/12 flex flex-col">
                <div className="h-1/12 bg-blue-400 text-black w-[100vw] flex items-center justify-center px-4">
                    <h1 className="text-2xl font-bold pr-20">
                        Productos
                    </h1>
                </div>
                <div className="h-1/12 bg-blue-400 text-black w-[100vw] flex items-center justify-center px-4">
                    <FoundProduct
                        products={products}
                        setProductList={setProductList}
                        setShow={setShow}
                    />
                    <CreateProduct>
                        <FormCreateProduct setProductId={setProductId}/>
                    </CreateProduct>
                </div>
            </div>
            {/* Primer div: 4/12 del espacio */}
            <div className="w-full h-[80vh] max-h-[90vh] overflow-hidden px-5 overflow-y-auto bg-blue-400">
                <ProductList productList={productList} show={show} />
            </div>

        </div>
    );

}