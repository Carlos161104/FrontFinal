'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductSelector from './ProductSelector';
import ClientSelector from './ClientSelector';
import { createQuotation, updateQuotation } from '@/actions/quotations/quotationsActions';

export default function CotizacionForm({ initialData, isEditing = false, quotationId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    client_id: initialData?.client_id || '',
    user_id: initialData?.user_id || '1', // Valor por defecto temporal
    products: initialData?.products || [],
    valid_time: initialData?.valid_time || '30 días',
    payment_method_id: initialData?.payment_method_id || '',
    total: initialData?.total || 0,
    pdf_url: initialData?.pdf_url || null
  });

  useEffect(() => {
    // Calcular el total basado en los productos seleccionados
    const total = formData.products.reduce((sum, product) => {
      return sum + (parseFloat(product.price) * parseInt(product.quantity, 10));
    }, 0);
    setFormData(prev => ({ ...prev, total: parseFloat(total.toFixed(2)) }));
  }, [formData.products]);

  const handleProductsChange = (products) => {
    setFormData(prev => ({ ...prev, products }));
  };

  const handleClientChange = (clientId) => {
    const numericId = clientId ? parseInt(clientId, 10) : '';
    setFormData(prev => ({ ...prev, client_id: numericId }));
  };

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : '';
    setFormData(prev => ({ ...prev, payment_method_id: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      // Validaciones
      if (!formData.client_id) {
        throw new Error('Por favor seleccione un cliente');
      }
      if (!formData.payment_method_id) {
        throw new Error('Por favor seleccione un método de pago');
      }
      if (formData.products.length === 0) {
        throw new Error('Por favor agregue al menos un producto');
      }
  
      // Preparar datos para enviar
      const quotationToSubmit = {
        client_id: parseInt(formData.client_id, 10),
        user_id: parseInt(formData.user_id, 10),
        payment_method_id: parseInt(formData.payment_method_id, 10),
        total: parseFloat(formData.total.toFixed(2)),
        valid_time: formData.valid_time.substring(0, 20),
        pdf_url: formData.pdf_url || null
      };
  
      let response;
      if (isEditing) {
        response = await updateQuotation(quotationId, quotationToSubmit);
      } else {
        response = await createQuotation(quotationToSubmit);
      }
      
      if (response) {
        router.push('/dashboard/cotizaciones');
        router.refresh();
      } else {
        throw new Error(`Error al ${isEditing ? 'actualizar' : 'crear'} la cotización`);
      }
  
    } catch (err) {
      console.error('Error completo:', err);
      setError(err.message || `Error al ${isEditing ? 'actualizar' : 'crear'} la cotización. Por favor, intente nuevamente.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ClientSelector
            selectedClientId={formData.client_id}
            onChange={handleClientChange}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tiempo de validez
          </label>
          <input
            type="text"
            value={formData.valid_time}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              valid_time: e.target.value.substring(0, 20)
            }))}
            maxLength={20}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Método de pago
          </label>
          <select
            value={formData.payment_method_id}
            onChange={handlePaymentMethodChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar método de pago</option>
            <option value="1">Efectivo</option>
            <option value="2">Transferencia</option>
            <option value="3">Tarjeta de crédito</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <ProductSelector
          selectedProducts={formData.products}
          onChange={handleProductsChange}
        />
      </div>

      <div className="mt-6">
        <div className="text-xl font-bold text-right">
          Total: ${formData.total.toFixed(2)}
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar Cotización' : 'Guardar Cotización')}
        </button>
      </div>
    </form>
  );
}