import { API_URL } from "@/constants";

const GetSellsByOrder = async (id) => {
  const resultSells = await fetch(`${API_URL}/sells`);
  const sells = await resultSells.json();

  const filteredSells = sells.filter((sell) => {
    return sell.order_id === id;
  });

  const detailedSells = await Promise.all(
    filteredSells.map(async (sell) => {
      const resultProduct = await fetch(
        `${API_URL}/products/${sell.product_id}`
      );
      const info = await resultProduct.json();
      const product = info.data;

      return {
        id: sell.id,
        quantity: sell.quantity,
        pendingQuantity: sell.pending_quantity,
        productName: product.name,
        productPrice: product.price,
        productDataSheet: product.data_sheet,
      };
    })
  );

  console.log(detailedSells);
  return detailedSells;
};

export default GetSellsByOrder;
