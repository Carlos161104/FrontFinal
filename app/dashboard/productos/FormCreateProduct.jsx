"use client";

import React, { useState } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import { createProduct } from "@/actions/products/createProduct";

const category_id = {
    1: "Accesorios para vehículos",
    2: "Agro",
    3: "Alimentos y Bebidas",
    4: "Animales y Mascotas",
    5: "Antigüedades y Colecciones",
    6: "Arte, Papelería y Mercería"
};

const FormCreateProduct = () => {
    const [product, setProduct] = useState({});
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    };
  
    const handleSelectChange = (selectedKeys) => {
        setProduct((prevProduct) => ({
        ...prevProduct,
        sales_funnel_id: selectedKeys.anchorKey,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createProduct(product);
        alert("Producto creado exitosamente");
      } catch (err) {
        setError(err.message);
      }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" rounded-md flex flex-col "
        >
            <h1 className="text-center text-xl">
                Crear un nuevo producto
            </h1>
            <Input
                required={true}
                isRequired
                label="Nombre"
                value={product.name || ""}
                placeholder="Ej. Leche"
                name="name"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Precio"
                value={product.price || ""}
                placeholder="Ej. 12.00"
                name="price"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Descripción"
                value={product.description || ""}
                placeholder="Ej. Leche 1L"
                name="description"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Descripción técnica"
                value={product.technical_description || ""}
                placeholder="Detalles especificos del prod"
                name="technical_description"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Id del SAT"
                value={product.sat_key || ""}
                placeholder="Ej. 4352342"
                name="sat_key"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="URL de ficha tecnica"
                value={product.data_sheet || ""}
                placeholder="Ej. https://data.com"
                name="data_sheet"
                onChange={handleChange}
            />
            <Select
                label="Categoría"
                name="category_id"
                selectedKeys={product.category_id ? [product.category_id] : []}
                onSelectionChange={handleSelectChange}
                className="bg-white rounded-lg"
            >
                {Object.entries(category_id).map(([key, value]) => (
                    <SelectItem
                        key={key}
                        className="bg-white rounded-lg hover:cursor-pointer"
                    >
                        {value}
                    </SelectItem>
                ))}
            </Select>

            <Button className="bg-green-300 rounded-lg" type="submit">
                Añadir
            </Button>
        </form>
    );
};

export default FormCreateProduct;
