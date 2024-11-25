'use client'
import { useState, useEffect } from 'react';
import { fetchProducts } from '@/actions/quotations/clientsProductsActions';

export default function ProductSelector({ selectedProducts = [], onChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(searchTerm);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los productos');
      setLoading(false);
    }
  };

  const handleProductSelect = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingProduct = selectedProducts.find(p => p.id === productId);
    if (existingProduct) {
      const updatedProducts = selectedProducts.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
      onChange(updatedProducts);
    } else {
      onChange([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedProducts = selectedProducts.map(p =>
      p.id === productId ? { ...p, quantity: newQuantity } : p
    );
    onChange(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter(p => p.id !== productId);
    onChange(updatedProducts);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Buscar productos
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Buscar por nombre..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lista de productos disponibles */}
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Productos Disponibles</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {products.map(product => (
              <div
                key={product.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleProductSelect(product.id)}
              >
                <div className="flex-grow">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.description}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${product.price}</div>
                  <div className="text-xs text-gray-500">SAT: {product.sat_key}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos seleccionados */}
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Productos Seleccionados</h3>
          <div className="space-y-2">
            {selectedProducts.map(product => (
              <div key={product.id} className="flex items-center space-x-2 p-2 border-b">
                <div className="flex-grow">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    Precio unitario: ${product.price}
                  </div>
                </div>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  className="w-20 rounded-md border-gray-300"
                />
                <div className="w-24 text-right">
                  <div className="font-medium">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}