import { API_URL } from "@/constants";

const GetOrderById = async (id) => {
    const result = await fetch(`${API_URL}/orders/${id}`);
    const data = await result.json();

    switch (data.payment_method_id) {
        case 1:
            data.payment_method_id = "Efectivo";
            break;
        case 2:
            data.payment_method_id = "Transferencia";
            break;
        case 3:
            data.payment_method_id = "Tarjeta de crédito";
            break;
        case 4:
            data.payment_method_id = "Tarjeta de débito";
            break;
        case 5:
            data.payment_method_id = "Pagos diferidos";
            break;
        default:
            data.payment_method_id = "Desconocido";
    }

    switch (data.sales_funnel_id) {
        case 1:
            data.sales_funnel_id = "Mercadolibre";
            break;
        case 2:
            data.sales_funnel_id = "Shopify";
            break;
        case 3:
            data.sales_funnel_id = "Facebook";
            break;
        case 4:
            data.sales_funnel_id = "Instagram";
            break;
        case 5:
            data.sales_funnel_id = "Marketplace Facebook";
            break;
        case 6:
            data.sales_funnel_id = "Marketplace Instagram";
            break;
        case 7:
            data.sales_funnel_id = "Venta directa";
            break;
        default:
            data.sales_funnel_id = "Desconocido";
    }
    return data;
    
}

export default GetOrderById;
