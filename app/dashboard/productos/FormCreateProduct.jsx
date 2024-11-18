import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
import UpdateClient from "@/actions/clients/UpdateClient";
import fetchClient from "@/actions/clients/GetClientById";

const salesFunnels = {
    1: "Mercadolibre",
    2: "Shopify",
    3: "Facebook",
    4: "Instagram",
    5: "Marketplace Facebook",
    6: "Marketplace Instagram",
    7: "Venta directa",
};

const FormCreateProduct = ({ clientid }) => {
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getClientData = async () => {
            try {
                const clientData = await fetchClient(clientid);
                setClient(clientData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getClientData();
    }, [clientid]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedKeys) => {
        setClient((prevClient) => ({
            ...prevClient,
            sales_funnel_id: selectedKeys.anchorKey,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await UpdateClient(client);
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
                value={client.name || ""}
                placeholder="Ej. Leche"
                name="name"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Precio"
                value={client.last_name || ""}
                placeholder="Ej. 12.00"
                name="price"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Descripción"
                value={client.email || ""}
                placeholder="Ej. Leche 1L"
                name="description"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Descripción técnica"
                value={client.phone || ""}
                placeholder="Detalles especificos del prod"
                name="technical_description"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="Id del SAT"
                value={client.company || ""}
                placeholder="Ej. 4352342"
                name="sat_key"
                onChange={handleChange}
            />
            <Input
                required={true}
                isRequired
                label="URL de ficha tecnica"
                value={client.company || ""}
                placeholder="Ej. https://data.com"
                name="data_sheet"
                onChange={handleChange}
            />
            <Select
                label="Canal de venta"
                name="sales_funnel_id"
                selectedKeys={client.sales_funnel_id ? [client.sales_funnel_id] : []}
                onSelectionChange={handleSelectChange}
                className="bg-white rounded-lg"
            >
                {Object.entries(salesFunnels).map(([key, value]) => (
                    <SelectItem
                        key={key}
                        className="bg-white rounded-lg hover:cursor-pointer"
                    >
                        {value}
                    </SelectItem>
                ))}
            </Select>

            <Button className="bg-green-300 rounded-lg" type="submit">
                Actualizar
            </Button>
        </form>
    );
};

export default FormCreateProduct;
