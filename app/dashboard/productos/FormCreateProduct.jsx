"use client";

import React, { useState } from "react";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { createProduct } from "@/actions/products/createProduct";
const categories = {
    1: "Accesorios para vehículos",
    2: "Agro",
    3: "Alimentos y Bebidas",
    4: "Animales y Mascotas",
    5: "Antigüedades y Colecciones",
    6: "Arte, Papelería y Mercería"
};

const FormCreateProduct = ({ setProductId }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const [tDesc, setTDes] = useState("");
    const [sat_key, setSat] = useState("");
    const [data_sheet, setData] = useState("");
    const [category_id, setCat] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = {
            name: name,
            price: parseFloat(price),
            description: desc,
            technical_description: tDesc,
            sat_key: sat_key,
            data_sheet: data_sheet,
            category_id: +category_id
        };
        setProductId(await createProduct(product));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-md flex flex-col overflow-y-auto h-50"
        >
            <h1 className="text-center text-xl">
                Crear un nuevo producto
            </h1>
            <input
                required={true}
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2"
            />
            <input
                required={true}
                placeholder="Precio"
                value={price}
                name="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2"
            />
            <input
                required={true}
                placeholder="Descripción"
                value={desc}
                name="description"
                onChange={(e) => setDesc(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2"
            />
            <textarea
                required={true}
                placeholder="Descripción técnica"
                value={tDesc}
                name="technical_description"
                onChange={(e) => setTDes(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2 resize-none min-h-20"
                
            />
            <input
                required={true}
                label="Id del SAT"
                value={sat_key}
                placeholder="Ej. 4352342"
                name="sat_key"
                onChange={(e) => setSat(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2"
            />
            <input
                required={true}
                placeholder="URL de ficha tecnica"
                value={data_sheet}
                name="data_sheet"
                onChange={(e) => setData(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full my-2"
            />
            <Select
                placeholder="Categoría"
                id="categories"
                onChange={(e) => setCat(e.target.value)}
                className="border border-gray-300 bg-white p-2 rounded w-full my-2 items-center align-right"
            >
                {Object.keys(categories).map((key) => (
                    <SelectItem
                        className="bg-white hover:cursor-pointer hover:border-black hover:border-2"
                        key={key}
                        value={key}
                    >
                        {categories[key]}
                    </SelectItem>
                ))}
            </Select>
            <div className="flex justify-center m-5">
                <Button className="bg-green-300 rounded-lg" type="submit">
                    Añadir
                </Button>
            </div>
        </form>
    );
};

export default FormCreateProduct;
