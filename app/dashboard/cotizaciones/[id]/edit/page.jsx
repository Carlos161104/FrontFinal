'use client'
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import CotizacionForm from '@/app/dashboard/cotizaciones/_components/CotizacionForm';
import { fetchQuotationById } from '@/actions/quotations/quotationsActions';

export default function EditQuotationPage({ params }) {
  // Desenvolver params usando React.use()
  const unwrappedParams = use(params);
  const quotationId = unwrappedParams.id;
  
  const router = useRouter();
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuotation = async () => {
      try {
        const data = await fetchQuotationById(quotationId);
        setQuotation(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar la cotización');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuotation();
  }, [quotationId]); // Ahora usamos quotationId en lugar de params.id

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-700 bg-red-100 rounded-md">
        {error}
      </div>
    );
  }

  if (!quotation) {
    return (
      <div className="p-4 text-gray-700 bg-gray-100 rounded-md">
        Cotización no encontrada
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Editar Cotización #{quotation.id}
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <CotizacionForm 
          initialData={quotation} 
          isEditing={true}
          quotationId={quotationId}
        />
      </div>
    </div>
  );
}